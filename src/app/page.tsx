import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-foreground/60">
        <h1 className="text-2xl font-bold">AI Blog</h1>
        <p className="mt-2">No posts yet. Add markdown files to content/posts/.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Latest Posts</h1>
      <ul className="mt-8 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-foreground/10 pb-8 last:border-0">
            {post.cover && (
              <Link href={`/posts/${post.slug}`}>
                <img src={post.cover} alt={post.title} className="w-full rounded-lg mb-4 object-cover max-h-64" />
              </Link>
            )}
            <Link href={`/posts/${post.slug}`} className="text-xl font-semibold hover:underline">
              {post.title}
            </Link>
            <time className="mt-1 block text-sm text-foreground/60">{post.date}</time>
            <p className="mt-2 text-foreground/80">{post.summary}</p>
            {post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-foreground/10 px-3 py-0.5 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
