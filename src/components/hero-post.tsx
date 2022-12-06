import Link from "next/link";

const HeroPost = ({ title, coverImage, date, excerpt, author, slug }: any) => {
  return (
    <section>
      <div className="">
        <div>
          <h3 className="">
            <Link as={`/posts/${slug}`} href="/posts/[slug]" className="">
              {title}
            </Link>
          </h3>
        </div>
        <div>
          <p className="">{excerpt}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroPost;
