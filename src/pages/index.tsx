import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getPostSlugs } from "../lib/api";

export default function Home({ posts }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>daikiskm.dev</title>
        <meta name="description" content="daikiskm's blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          {posts.map((post: any) => (
            <div key={post}>
              <Link href={`/posts/${encodeURIComponent(post)}`}>{post}</Link>
            </div>
          ))}
        </div>
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
  const allPosts = getPostSlugs();
  const posts = allPosts.map((slug) => slug.replace(/\.mdx$/, ""));

  return {
    props: { posts },
  };
};
