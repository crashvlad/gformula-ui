import { formatDatePost } from '@/lib/date';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/get-initials';
import { Post } from 'contentlayer/generated';

export function PostCard({ post }: { post: Post }) {
  return (
    <article
      key={post.slug}
      className="flex flex-col items-start justify-between"
    >
      <div className="relative w-full">
        <Image
          src={post.imageUrl}
          alt=""
          height={500}
          width={500}
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
          <p className="relative z-10 rounded-full px-3 py-1.5 font-medium bg-card">
            {post.category}
          </p>
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
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.authorImage ?? ''} alt="@shadcn" />
            <AvatarFallback>{getInitials(post.author)}</AvatarFallback>
          </Avatar>
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
  );
}
