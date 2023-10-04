import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { formatDatePost } from '@/lib/date';

export function Posts() {
  return (
    <div className="py-24 sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="grid max-w-2xl grid-cols-1 mx-auto mt-16 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {allPosts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <img
                  src={post.imageUrl}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="flex items-center mt-8 text-xs gap-x-4">
                  <time
                    dateTime={post.date}
                    className="capitalize text-muted-foreground"
                  >
                    {formatDatePost(post.date)}
                  </time>
                  {/* <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a> */}
                </div>
                <div className="relative group">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:underline">
                    <a href={post.slug}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="relative flex items-center mt-8 gap-x-4">
                  {/* <img
                    src={post.author}
                    alt=""
                    className="w-10 h-10 bg-gray-100 rounded-full"
                  /> */}
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-muted-foreground">
                      <span className="absolute inset-0" />
                      {post.author}
                    </p>
                    {/* <p className="text-gray-600">{post.author.role}</p> */}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
