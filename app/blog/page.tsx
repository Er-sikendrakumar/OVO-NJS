import { WordPressPost } from "./[id]/page";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { EbookBanner } from "@/app/components/EbookBanner";
import { Input } from "@/app/components/ui/input";
import { PopularLocations } from "../components/PopularLocations";

async function fetchBlogPostFromWordPress(
  page: number = 1,
  perPage: number = 13
): Promise<{ posts: WordPressPost[]; totalPages: number } | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=true&orderby=date&order=desc`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
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
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function fetchFeaturedPosts(): Promise<WordPressPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=4&_embed=true&orderby=date&order=desc`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return [];
    }

    const posts: WordPressPost[] = await response.json();
    return posts.slice(0, 4);
  } catch (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  link: string;
}

async function fetchAllCategories(): Promise<WordPressCategory[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/tags?per_page=100&orderby=count&order=desc`;

    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      return [];
    }

    const categories: WordPressCategory[] = await response.json();
    // Filter out categories with 0 posts
    console.log(categories, "categories");
    return categories.filter((cat) => cat.count > 0);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
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

function FeaturedPostCard({ post }: { post: WordPressPost }) {
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
      className="flex flex-col group hover:opacity-90 transition-opacity relative"
    >
      {featuredImage && (
        <div className="relative w-full aspect-video overflow-hidden rounded-[16px] mb-[20px] h-[562px] md:h-[388px]">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />
        </div>
      )}
      <div className="absolute bottom-[32px] left-[32px] right-[32px] ">
        <h3
          className="text-[24px]  font-semibold text-white mb-2 transition-colors"
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />
        {post.excerpt?.rendered && (
          <p
            className="text-[16px] text-white  mb-2"
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
            }}
          />
        )}
      </div>
    </Link>
  );
}

function SmallPostCard({ post }: { post: WordPressPost }) {
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
      className="flex flex-col md:flex-row gap-[16px] group hover:opacity-90 transition-opacity"
    >
      {featuredImage && (
        <div className="relative w-full md:w-[195px]  h-[224px] md:h-[108px] flex-shrink-0 overflow-hidden rounded-[16px]">
          <Image
            src={featuredImage.source_url}
            alt={featuredImage.alt_text || post.title.rendered}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="150px"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 min-w-0">
        <h3
          className="text-[24px]  font-semibold text-gray-900 mb-2 md:line-clamp-1 transition-colors"
          dangerouslySetInnerHTML={{
            __html: post.title.rendered,
          }}
        />
        {post.excerpt?.rendered && (
          <p
            className="text-[16px] text-gray-600 md:line-clamp-1 mb-[24px]"
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
            }}
          />
        )}
        <div className="flex items-center gap-[8px] text-[#026AA2] mt-auto">
          <span className="text-[14px] md:text-[16px] font-semibold">
            Explore Article
          </span>
          <svg
            width="16"
            height="16"
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
      </div>
    </Link>
  );
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
      <div className="items-center gap-[8px] text-[#026AA2] hidden md:flex">
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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1", 10);

  const featuredPosts = await fetchFeaturedPosts();
  // Fetch enough posts to ensure 9 posts remain after excluding featured posts
  const postsPerPage = 9;
  const blogData = await fetchBlogPostFromWordPress(
    currentPage,
    postsPerPage + featuredPosts.length
  );
  const categories = await fetchAllCategories();

  if (!blogData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-[112px] md:pt-[184px] pb-[64px] md:pb-[96px] w-full flex-1 max-w-[1280px] mx-auto px-[16px] md:px-[32px]">
          <h1 className="text-[36px] text-primary font-semibold mb-8">Blog</h1>
          <p className="text-[16px] text-[#535862]">No posts found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { posts, totalPages } = blogData;

  // Exclude featured posts from paginated list
  const featuredPostIds = new Set(featuredPosts.map((p) => p.id));
  const paginatedPosts = posts
    .filter((p) => !featuredPostIds.has(p.id))
    .slice(0, postsPerPage);

  // Ensure totalPages is valid and at least 1
  const validTotalPages = Math.max(1, totalPages || 1);

  return (
    <div className="bg-white flex flex-col">
      {/* Featured Posts Section */}
      {featuredPosts.length > 0 && (
        <div className="pt-[92px] md:pt-[144px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto">
          <div className="px-[16px] md:px-[32px]">
            <h2 className="md:text-[48px] text-[30px] text-gray-900 font-semibold mb-[32px] ">
              Opus Virtual Offices Resources and Insights
            </h2>
            <div className="relative">
              <Input
                placeholder="Look for a topic"
                className="text-gray-500 text-[16px] mb-[20px] md:mb-[40px] pl-[42px]"
              />
              <div className="absolute left-[14px] top-[50%] transform -translate-y-1/2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                    stroke="#667085"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] pt-[20px] md:pt-[40px]">
              {/* Large featured post on the left */}
              {featuredPosts[0] && (
                <div className="md:col-span-1">
                  <FeaturedPostCard post={featuredPosts[0]} />
                </div>
              )}
              {/* Three smaller posts on the right */}
              <div className="md:col-span-1 flex flex-col gap-[24px]">
                {featuredPosts.slice(1, 4).map((post) => (
                  <SmallPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ebook Banner */}
      <div className="w-full py-[20px] md:py-[40px]">
        <EbookBanner />
      </div>

      {/* Categories Navigation */}
      {categories.length > 0 && (
        <div className="w-full max-w-[1280px] mx-auto px-[16px] md:px-[32px] pt-[20px] md:pt-[40px]">
          <div className="flex flex-nowrap items-center gap-[16px] overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/blog/category/${category.slug}`}
                className="flex capitalize items-center gap-[8px] border border-gray-200 rounded-[16px] bg-gray-50 whitespace-nowrap px-[12px] py-[2px] text-[14px] font-medium text-gray-700 hover:text-gray-900 transition-colors flex-shrink-0"
              >
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Paginated Posts Section */}
      <div className="pt-[64px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] gap-y-[48px] px-[16px] md:px-[32px] pb-[64px] border-b-[1px] border-gray-200">
          {paginatedPosts.length > 0 ? (
            paginatedPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-[16px] text-[#535862] col-span-full">
              No more posts to display.
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
                  href={`/blog?page=${currentPage - 1}`}
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
                  href={`/blog?page=${currentPage + 1}`}
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
                  href={`/blog?page=${currentPage - 1}`}
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
                    // Show all pages if 7 or fewer
                    for (let i = 1; i <= validTotalPages; i++) {
                      pages.push(i);
                    }
                  } else {
                    // Always show first page
                    pages.push(1);

                    if (currentPage <= 3) {
                      // Show 1, 2, 3, 4, ..., last
                      for (let i = 2; i <= 4; i++) {
                        pages.push(i);
                      }
                      pages.push("ellipsis");
                      pages.push(validTotalPages);
                    } else if (currentPage >= validTotalPages - 2) {
                      // Show 1, ..., last-3, last-2, last-1, last
                      pages.push("ellipsis");
                      for (
                        let i = validTotalPages - 3;
                        i <= validTotalPages;
                        i++
                      ) {
                        pages.push(i);
                      }
                    } else {
                      // Show 1, ..., current-1, current, current+1, ..., last
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
                        href={`/blog?page=${page}`}
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
                  href={`/blog?page=${currentPage + 1}`}
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
        <div className="pt-[20px] md:pt-[40px] ">
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
