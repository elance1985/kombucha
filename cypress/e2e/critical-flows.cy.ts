import { publishedPosts, criticalPosts } from "../fixtures/critical-posts";

describe("Critical user flows", () => {
  it("renders homepage and key CTA", () => {
    cy.visit("/");
    cy.contains("h1", "Benvenuto nel Mondo della Kombucha").should("be.visible");
    cy.contains("a", "Scopri la Kombucha").should("be.visible");
  });

  it("opens mobile hamburger menu and shows links", () => {
    cy.viewport("iphone-6");
    cy.visit("/");
    cy.get('button[aria-label="Apri menu"]').click();
    cy.get("#mobile-nav").should("be.visible");
    cy.get("#mobile-nav").contains("a", "Blog").should("be.visible");
    cy.get("#mobile-nav").contains("a", "Shop").should("be.visible");
    cy.get("#mobile-nav").contains("a", "Newsletter").should("be.visible");
  });

  it("renders blog page with Italian title", () => {
    cy.visit("/blog");
    cy.contains("h1", "Guide e articoli sulla kombucha").should("be.visible");
  });

  publishedPosts.forEach((post) => {
    it(`opens published article: ${post.slug}`, () => {
      cy.visit(`/blog/${post.slug}`);
      cy.contains("h1", post.title).should("be.visible");
      cy.contains("h2", post.section).should("be.visible");
      cy.contains("a", "Torna al blog").should("be.visible");
      cy.contains("Anteprima — contenuto completo in arrivo").should(
        "not.exist"
      );
    });
  });

  it("opens a draft blog article with preview badge", () => {
    const draftPost = criticalPosts.find((post) => !post.published);
    cy.visit(`/blog/${draftPost!.slug}`);
    cy.contains("h1", draftPost!.title).should("be.visible");
    cy.contains("a", "Torna al blog").should("be.visible");
    cy.contains("Anteprima — contenuto completo in arrivo").should(
      "be.visible"
    );
  });

  it("navigates from blog index to a published article", () => {
    const post = publishedPosts[0];
    cy.visit("/blog");
    cy.contains("article", post.title)
      .contains("a", "Leggi articolo →")
      .click();
    cy.url().should("include", `/blog/${post.slug}`);
    cy.contains("h1", post.title).should("be.visible");
    cy.contains("Anteprima — contenuto completo in arrivo").should("not.exist");
  });

  it("renders shop page with coming soon messaging", () => {
    cy.visit("/shop");
    cy.contains("h1", "Il nostro Shop apre presto").should("be.visible");
    cy.contains("a", "Avvisami quando apre →").should("be.visible");
  });

  it("renders newsletter section with Italian copy", () => {
    cy.visit("/#newsletter");
    cy.get("#newsletter").should("be.visible");
    cy.contains(
      "h2",
      "Resta aggiornato sul Mondo della Kombucha"
    ).should("be.visible");
    cy.contains(
      "Iscriviti e ricevi gratuitamente le nostre guide, ricette e consigli"
    ).should("be.visible");
    cy.contains("Nessuno spam. Puoi cancellarti quando vuoi.").should(
      "be.visible"
    );
  });

  it("wires MailerLite embed and universal script", () => {
    cy.visit("/");
    cy.get('#newsletter .ml-embedded[data-form="xGDQlE"]').should("exist");
    cy.get('script#mailerlite-universal').should("exist");
  });

  it("navigates to newsletter section from homepage anchor", () => {
    cy.visit("/");
    cy.contains("a", "Iscriviti alla newsletter").first().click();
    cy.url().should("include", "#newsletter");
    cy.get("#newsletter").should("be.visible");
  });

  it("localizes MailerLite success confirmation in Italian", () => {
    cy.visit("/#newsletter");
    cy.get("#newsletter .newsletter-form").then(($form) => {
      $form.append(`
        <div class="ml-form-successBody row-success">
          <div class="ml-form-successContent">
            <h4>Thank you!</h4>
            <p>You have successfully joined our subscriber list.</p>
          </div>
        </div>
      `);
    });

    cy.get("#newsletter .ml-form-successContent h4").should(($heading) => {
      const content = getComputedStyle($heading[0], "::after").content;
      expect(content).to.match(/Grazie/i);
    });

    cy.get("#newsletter .ml-form-successContent p").should(($paragraph) => {
      const content = getComputedStyle($paragraph[0], "::after").content;
      expect(content).to.match(/iscritto con successo/i);
    });
  });
});
