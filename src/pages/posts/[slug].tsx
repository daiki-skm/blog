import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Head from "next/head";
import markdownToHtml from "../../lib/markdownToHtml";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import dynamic from "next/dynamic";
import { Suspense } from "react";

export default function Post({ post, morePosts, preview }: any) {
  const router = useRouter();
  const DynamicHeader = dynamic(() => import("../../public/demo.mdx"), {
    suspense: true,
  });
  return (
    <div>
      <div>
        {router.isFallback ? (
          <div>Loading…</div>
        ) : (
          <>
            <article>
              <Head>
                <title>demo</title>
              </Head>
              {/* <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} /> */}
              <Suspense>
                <DynamicHeader />
              </Suspense>
            </article>
          </>
        )}
      </div>
    </div>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
