import { Post, allPosts } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

import { Mdx } from '@/components/mdx-components';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import Balancer from 'react-wrap-balancer';

export const getStaticPaths = (async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.slugAsParams.split('/') },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const slug = context?.params?.slug[0];
  const post = allPosts.find((post) => post.slugAsParams === slug);

  return { props: { post } };
}) satisfies GetStaticProps<{
  post: Post;
}>;

export default function PostPost({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Header />
      <main className="w-full max-w-2xl py-10 mx-auto bg-background">
        <article className="mx-auto prose-xl dark:prose-invert">
          <h1 className="font-bold">
            <Balancer>{post.title}</Balancer>
          </h1>
          {post.description && <p className="text-xl">{post.description}</p>}
          <hr />
          <Mdx code={post.body.code} />
        </article>
      </main>

      <Footer />
    </>
  );
}
