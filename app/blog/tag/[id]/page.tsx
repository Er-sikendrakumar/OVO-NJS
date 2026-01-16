import { WordPressPost } from "../../[id]/page";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { notFound } from "next/navigation";
import OfficeSolutionBanner from "@/app/components/OfficeSolutionBanner";

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  count: number;
  link: string;
  description?: string;
}

async function fetchTagBySlug(slug: string): Promise<WordPressTag | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/tags?slug=${encodeURIComponent(
      slug
    )}`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const tags: WordPressTag[] = await response.json();

    if (!tags || tags.length === 0) {
      return null;
    }

    return tags[0];
  } catch (error) {
    console.error("Error fetching tag:", error);
    return null;
  }
}

async function fetchPostsByTag(
  tagId: number,
  page: number = 1,
  perPage: number = 9
): Promise<{ posts: WordPressPost[]; totalPages: number } | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?tags=${tagId}&per_page=${perPage}&page=${page}&_embed=true&orderby=date&order=desc`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    const posts: WordPressPost[] = await response.json();

    // Try to get totalPages from header (case-insensitive)
    let totalPages = parseInt(
      response.headers.get("x-wp-totalpages") ||
        response.headers.get("X-WP-TotalPages") ||
        "1",
      10
    );

    // If header is missing or invalid, calculate from total posts
    if (!totalPages || totalPages < 1) {
      const totalPosts = parseInt(
        response.headers.get("x-wp-total") ||
          response.headers.get("X-WP-Total") ||
          String(posts.length),
        10
      );
      totalPages = Math.max(1, Math.ceil(totalPosts / perPage));
    }

    if (!posts || posts.length === 0) {
      return null;
    }

    return { posts, totalPages };
  } catch (error) {
    console.error("Error fetching posts by tag:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCard({ post }: { post: WordPressPost }) {
  const featuredImage =
    post._embedded?.["wp:featuredmedia"]?.[0] ||
    (post.uagb_featured_image_src?.full && {
      source_url: post.uagb_featured_image_src.full[0],
      media_details: {
        width: post.uagb_featured_image_src.full[1],
        height: post.uagb_featured_image_src.full[2],
      },
      alt_text: post.title.rendered,
    });

  const postSlug =
    post.slug || post.link?.split("/").filter(Boolean).pop() || "";

  return (
    <Link
      href={`/blog/${postSlug}`}
      className="flex flex-col group hover:opacity-90 transition-opacity"
    >
      {featuredImage && (
        <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-[20px] h-[280px]">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          />
        </div>
      )}
      <h3
        className="text-[24px] font-semibold text-[#181d27] mb-2 line-clamp-2 transition-colors"
        dangerouslySetInnerHTML={{
          __html: post.title.rendered,
        }}
      />
      {post.excerpt?.rendered && (
        <p
          className="text-[16px] text-[#535862] line-clamp-3 mb-2"
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
          }}
        />
      )}
      <time
        dateTime={post.date}
        className="text-[16px] text-[#535862] font-medium mb-[24px]"
      >
        {formatDate(post.date)}
      </time>
      <div className="items-center gap-[8px] text-[#026AA2] flex">
        <span className="text-[16px] font-semibold">Read post</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.8335 14.1666L14.1668 5.83325M14.1668 5.83325H5.8335M14.1668 5.83325V14.1666"
            stroke="#026AA2"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tag = await fetchTagBySlug(id);

  if (!tag) {
    return {
      title: "Tag Not Found",
    };
  }

  return {
    title: `${tag.name} - Blog Tag`,
    description: tag.description || `Recent posts tagged with ${tag.name}`,
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = parseInt(searchParamsResolved.page || "1", 10);

  const tag = await fetchTagBySlug(id);

  if (!tag) {
    notFound();
  }

  const postsPerPage = 9;
  const blogData = await fetchPostsByTag(tag.id, currentPage, postsPerPage);

  if (!blogData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-[92px] md:pt-[144px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto px-[16px] md:px-[32px]">
          <h1 className="text-[36px] text-primary font-semibold mb-8 capitalize">
            {tag.name}
          </h1>
          <p className="text-[16px] text-[#535862]">No posts found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { posts, totalPages } = blogData;
  const validTotalPages = Math.max(1, totalPages || 1);

  return (
    <div className="bg-white flex flex-col">
      {/* Tag Header */}
      <div className="pt-[92px] md:pt-[144px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto px-[16px] md:px-[32px]">
        <h1 className="text-[36px] md:text-[48px] text-primary font-semibold mb-[32px] capitalize">
          {tag.name}
        </h1>
        <p className="text-[20px] text-[#535862] font-normal">
          Recent Posts About {tag.name}
        </p>
      </div>

      {/* Posts Grid */}
      <div className="pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] gap-y-[48px] px-[16px] md:px-[32px] pb-[64px] border-b-[1px] border-gray-200 mt-[20px] md:mt-[40px]">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-[16px] text-[#535862] col-span-full">
              No posts found with this tag.
            </p>
          )}
        </div>

        {/* Pagination */}
        {validTotalPages > 1 && (
          <div className="px-[16px] md:px-[32px] mt-[20px] mb-[20px] md:mb-[40px]">
            {/* Mobile View: Simple "Page X of Y" with Previous/Next buttons */}
            <div className="flex items-center justify-between gap-[8px] md:hidden">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <Link
                  href={`/blog/tag/${id}?page=${currentPage - 1}`}
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Page Info */}
              <div className="text-[14px] font-medium text-gray-700">
                Page {currentPage} of {validTotalPages}
              </div>

              {/* Next Button */}
              {currentPage < validTotalPages ? (
                <Link
                  href={`/blog/tag/${id}?page=${currentPage + 1}`}
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 5L12.5 10L7.5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="flex items-center justify-center w-[40px] h-[40px] rounded-lg border border-gray-300 text-gray-400 cursor-not-allowed">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 5L12.5 10L7.5 15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Desktop View: Full pagination with page numbers */}
            <div className="hidden md:flex items-center justify-between gap-[8px]">
              {/* Previous Button */}
              {currentPage > 1 ? (
                <Link
                  href={`/blog/tag/${id}?page=${currentPage - 1}`}
                  className="flex items-center gap-[8px] py-[8px] text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12L6 8L10 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Previous</span>
                </Link>
              ) : (
                <div className="flex items-center gap-[8px] py-[8px] text-[14px] font-semibold text-gray-600 cursor-not-allowed">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.8333 10.0001H4.16666M4.16666 10.0001L10 15.8334M4.16666 10.0001L10 4.16675"
                      stroke="#475467"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Previous</span>
                </div>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-[4px] text-[14px] font-semibold text-gray-600">
                {(() => {
                  const pages: (number | "ellipsis")[] = [];

                  if (validTotalPages <= 7) {
                    for (let i = 1; i <= validTotalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    pages.push(1);

                    if (currentPage <= 3) {
                      for (let i = 2; i <= 4; i++) {
                        pages.push(i);
                      }
                      pages.push("ellipsis");
                      pages.push(validTotalPages);
                    } else if (currentPage >= validTotalPages - 2) {
                      pages.push("ellipsis");
                      for (
                        let i = validTotalPages - 3;
                        i <= validTotalPages;
                        i++
                      ) {
                        pages.push(i);
                      }
                    } else {
                      pages.push("ellipsis");
                      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                        pages.push(i);
                      }
                      pages.push("ellipsis");
                      pages.push(validTotalPages);
                    }
                  }

                  return pages.map((page, index) => {
                    if (page === "ellipsis") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-[8px] text-[16px] text-gray-700"
                        >
                          ...
                        </span>
                      );
                    }
                    const isActive = page === currentPage;
                    return (
                      <Link
                        key={page}
                        href={`/blog/tag/${id}?page=${page}`}
                        className={`relative flex items-center justify-center w-[40px] h-[40px] rounded-full text-[14px] font-medium transition-colors ${
                          isActive
                            ? "bg-gray-200 text-gray-800"
                            : "text-gray-600 "
                        }`}
                      >
                        {page}
                      </Link>
                    );
                  });
                })()}
              </div>

              {/* Next Button */}
              {currentPage < validTotalPages ? (
                <Link
                  href={`/blog/tag/${id}?page=${currentPage + 1}`}
                  className="flex items-center gap-[8px] py-[8px] text-[14px] font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>Next</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.16663 10.0001H15.8333M15.8333 10.0001L9.99996 4.16675M15.8333 10.0001L9.99996 15.8334"
                      stroke="#475467"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
                <div className="flex items-center gap-[8px] py-[8px] text-[14px] font-semibold text-gray-600 cursor-not-allowed">
                  <span>Next</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="py-[40px]">
          <OfficeSolutionBanner />
        </div>
        <div className="pt-[20px] md:pt-[40px]">
          <PopularLocations
            description="Over 650 Locations Across the USA"
            description2="All-Inclusive Virtual Office Services for Only $99"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
