import { PostCard } from '@/components/landing/PostCard';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { allPosts } from 'contentlayer/generated';

export default function PostPost() {
  return (
    <>
      <Header />
      <main>
        <div className="px-6 py-10 pb-24 mx-auto max-w-7xl lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {allPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
