import Link from "next/link";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  try {
    const post = await getPostBySlug(slug);

    return (
      <article>
        <Link href="/" className="text-sm text-foreground/60 hover:underline">
          ← Back to posts
        </Link>
        <header className="mt-6">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <time className="mt-2 block text-sm text-foreground/60">{post.date}</time>
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
        </header>
        <div
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    );
  } catch {
    notFound();
  }
}
