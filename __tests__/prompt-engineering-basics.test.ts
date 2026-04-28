import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPostBySlug, getPostSlugs, getAllPosts } from "../src/lib/posts";
import type { Post } from "../src/lib/posts";

const SLUG = "prompt-engineering-basics";
const POST_FILE = path.join(process.cwd(), "content/posts", `${SLUG}.md`);

// Parse frontmatter once for fast synchronous tests
const rawFile = fs.readFileSync(POST_FILE, "utf8");
const { data: frontmatter, content: markdownBody } = matter(rawFile);

// Load the fully-processed post once for async tests
let post: Post;
beforeAll(async () => {
  post = await getPostBySlug(SLUG);
});

// ---------------------------------------------------------------------------
// Frontmatter – required fields
// ---------------------------------------------------------------------------

describe("prompt-engineering-basics.md – frontmatter", () => {
  it("has a non-empty title", () => {
    expect(typeof frontmatter.title).toBe("string");
    expect(frontmatter.title.length).toBeGreaterThan(0);
  });

  it("title matches the expected value", () => {
    expect(frontmatter.title).toBe("Prompt Engineering: How to Talk to AI");
  });

  it("has a date field", () => {
    expect(frontmatter.date).toBeDefined();
  });

  it("date is the correct value", () => {
    expect(frontmatter.date).toBe("2026-04-28");
  });

  it("date matches ISO 8601 date format (YYYY-MM-DD)", () => {
    expect(frontmatter.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("has a non-empty summary", () => {
    expect(typeof frontmatter.summary).toBe("string");
    expect(frontmatter.summary.length).toBeGreaterThan(0);
  });

  it("summary contains key concepts", () => {
    expect(frontmatter.summary.toLowerCase()).toContain("prompt");
  });

  it("has a tags array", () => {
    expect(Array.isArray(frontmatter.tags)).toBe(true);
  });

  it("tags array is non-empty", () => {
    expect(frontmatter.tags.length).toBeGreaterThan(0);
  });

  it("tags contains 'prompt engineering'", () => {
    expect(frontmatter.tags).toContain("prompt engineering");
  });

  it("tags contains 'AI basics'", () => {
    expect(frontmatter.tags).toContain("AI basics");
  });

  it("tags contains 'tips'", () => {
    expect(frontmatter.tags).toContain("tips");
  });

  it("tags has exactly 3 entries", () => {
    expect(frontmatter.tags).toHaveLength(3);
  });

  it("does not have a cover field (optional field absent)", () => {
    expect(frontmatter.cover).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Raw markdown body – structural content
// ---------------------------------------------------------------------------

describe("prompt-engineering-basics.md – markdown body structure", () => {
  it("has a top-level H1 heading", () => {
    expect(markdownBody).toMatch(/^#\s+/m);
  });

  it("includes the 'The Problem' section heading", () => {
    expect(markdownBody).toContain("## The Problem");
  });

  it("includes the 'The Framework: CRISPE' section heading", () => {
    expect(markdownBody).toContain("## The Framework: CRISPE");
  });

  it("includes the 'Before and After' section heading", () => {
    expect(markdownBody).toContain("## Before and After");
  });

  it("includes the 'Quick Tips' section heading", () => {
    expect(markdownBody).toContain("## Quick Tips");
  });

  it("includes the 'The Meta Lesson' section heading", () => {
    expect(markdownBody).toContain("## The Meta Lesson");
  });

  it("contains a GFM table with Prompt and Result columns", () => {
    expect(markdownBody).toContain("| Prompt | Result |");
  });

  it("contains all 6 CRISPE acronym letters defined", () => {
    const crisp = ["**C**ontext", "**R**ole", "**I**nstruction", "**S**cope", "**P**ersonalization", "**E**xamples"];
    for (const item of crisp) {
      expect(markdownBody).toContain(item);
    }
  });

  it("Quick Tips section has 5 numbered items", () => {
    const matches = markdownBody.match(/^\d+\.\s+/gm);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(5);
  });

  it("contains a blockquote (bad prompt example)", () => {
    expect(markdownBody).toMatch(/^>\s+/m);
  });

  it("contains the good prompt blockquote with key constraints", () => {
    expect(markdownBody).toContain(
      '"Explain how relational databases work to a junior developer who knows Python but has never used SQL. Use a library analogy. Keep it under 200 words."'
    );
  });

  it("body is non-trivially long (>= 500 characters)", () => {
    expect(markdownBody.length).toBeGreaterThanOrEqual(500);
  });
});

// ---------------------------------------------------------------------------
// getPostBySlug – Post object returned by the processing pipeline
// ---------------------------------------------------------------------------

describe("getPostBySlug('prompt-engineering-basics') – processed Post object", () => {
  it("resolves to a Post with the correct slug", () => {
    expect(post.slug).toBe(SLUG);
  });

  it("title on Post matches frontmatter title", () => {
    expect(post.title).toBe("Prompt Engineering: How to Talk to AI");
  });

  it("date on Post matches frontmatter date", () => {
    expect(post.date).toBe("2026-04-28");
  });

  it("summary on Post is non-empty", () => {
    expect(post.summary.length).toBeGreaterThan(0);
  });

  it("tags on Post equals expected array", () => {
    expect(post.tags).toEqual(["prompt engineering", "AI basics", "tips"]);
  });

  it("cover on Post is undefined (no cover image)", () => {
    expect(post.cover).toBeUndefined();
  });

  it("contentHtml is a non-empty string", () => {
    expect(typeof post.contentHtml).toBe("string");
    expect(post.contentHtml.length).toBeGreaterThan(0);
  });

  it("contentHtml contains rendered headings", () => {
    expect(post.contentHtml).toContain("<h2>");
  });

  it("contentHtml contains the CRISPE section heading text", () => {
    expect(post.contentHtml).toContain("The Framework: CRISPE");
  });

  it("contentHtml contains rendered GFM table markup", () => {
    expect(post.contentHtml).toContain("<table>");
  });

  it("contentHtml table has Prompt and Result headers", () => {
    expect(post.contentHtml).toContain("Prompt");
    expect(post.contentHtml).toContain("Result");
  });

  it("contentHtml contains an ordered list for Quick Tips", () => {
    expect(post.contentHtml).toContain("<ol>");
  });

  it("contentHtml contains an unordered list for CRISPE items", () => {
    expect(post.contentHtml).toContain("<ul>");
  });

  it("contentHtml contains rendered blockquote", () => {
    expect(post.contentHtml).toContain("<blockquote>");
  });

  it("contentHtml contains bold text markup", () => {
    expect(post.contentHtml).toContain("<strong>");
  });

  it("contentHtml contains 'CRISPE' text", () => {
    expect(post.contentHtml).toContain("CRISPE");
  });

  it("contentHtml contains 'clear communication' from the meta lesson", () => {
    expect(post.contentHtml).toContain("clear communication");
  });
});

// ---------------------------------------------------------------------------
// getPostSlugs – slug registration
// ---------------------------------------------------------------------------

describe("getPostSlugs – slug registration", () => {
  it("includes 'prompt-engineering-basics' in the list of slugs", () => {
    const slugs = getPostSlugs();
    expect(slugs).toContain(SLUG);
  });
});

// ---------------------------------------------------------------------------
// getAllPosts – integration with the full post collection
// ---------------------------------------------------------------------------

describe("getAllPosts – collection integration", () => {
  it("returns an array that includes the prompt-engineering-basics post", async () => {
    const posts = await getAllPosts();
    const found = posts.find((p) => p.slug === SLUG);
    expect(found).toBeDefined();
  });

  it("the prompt-engineering-basics post in the collection has the correct title", async () => {
    const posts = await getAllPosts();
    const found = posts.find((p) => p.slug === SLUG)!;
    expect(found.title).toBe("Prompt Engineering: How to Talk to AI");
  });

  it("posts are sorted with newest date first (2026-04-28 is not after any later date)", async () => {
    const posts = await getAllPosts();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(posts[i].date >= posts[i + 1].date).toBe(true);
    }
  });
});