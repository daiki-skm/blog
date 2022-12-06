import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import posts from "../public/posts.json";
import { getAllPosts } from "../lib/api";
import HeroPost from "../components/hero-post";

export default function Home({ allPosts }: any) {
  const heroPost = allPosts[0];
  return (
    <div className={styles.container}>
      <Head>
        <title>daikiskm.dev</title>
        <meta name="description" content="daikiskm's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <div>
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/posts/${encodeURIComponent(post.id)}`}>
                {post.title} {post.created_at}
              </Link>
            </div>
          ))}
        </div> */}
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
      </main>

      <footer className={styles.footer}>
        <a href="/" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
