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

  it("opens a critical blog article route", () => {
    cy.visit("/blog/first-brew");
    cy.contains("h1", "La tua prima kombucha fatta in casa").should("be.visible");
    cy.contains("a", "Torna al blog").should("be.visible");
  });

  it("renders shop page with coming soon messaging", () => {
    cy.visit("/shop");
    cy.contains("h1", "Il nostro Shop apre presto").should("be.visible");
    cy.contains("a", "Avvisami quando apre →").should("be.visible");
  });
});
