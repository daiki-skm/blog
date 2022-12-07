import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPostSlugs } from "../../lib/api";

export default function Post({ id }: any) {
  const DynamicHeader = dynamic(() => import(`../../public/posts/${id}.mdx`), {
    suspense: true,
  });
  return (
    <article>
      <Suspense fallback={"Loading..."}>
        <DynamicHeader />
      </Suspense>
    </article>
  );
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id;

  return {
    props: { id },
    revalidate: 10,
  };
};

export async function getStaticPaths() {
  const allPosts = getPostSlugs();
  const posts = allPosts.map((slug) => slug.replace(/\.mdx$/, ""));
  const paths = posts.map((val: any) => {
    return { params: { id: val } };
  });

  return {
    paths: paths,
    fallback: false,
  };
}
