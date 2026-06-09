import { compileMDX } from "next-mdx-remote/rsc";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/mdx-components";

export async function compilePostMdx(source: string) {
  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeUnwrapImages],
      },
    },
  });
  return content;
}
