import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cleanWordPressHtml } from "@/app/lib/utils";
import { PopularLocations } from "@/app/components/PopularLocations";
import { Footer } from "@/app/components/Footer";

export interface WordPressPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  author: number;
  uagb_author_info?: {
    display_name: string;
    author_link: string;
  };
  uagb_featured_image_src?: {
    full: [string, number, number, boolean];
    large: [string, number, number, boolean];
  };
  yoast_head_json?: {
    title: string;
    description: string;
    og_image?: Array<{
      url: string;
      width: number;
      height: number;
    }>;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details: {
        width: number;
        height: number;
      };
      alt_text?: string;
    }>;
  };
}

async function fetchBlogPostFromWordPress(
  slug: string
): Promise<WordPressPost | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?slug=${encodeURIComponent(
      slug
    )}&_embed=true`;

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

    if (!posts || posts.length === 0) {
      return null;
    }

    return posts[0];
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

async function fetchPopularPosts(
  excludePostId: number,
  limit: number = 3
): Promise<WordPressPost[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    // Get popular posts (sticky posts or recent posts, excluding current post)
    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=${limit}&exclude=${excludePostId}&_embed=true&orderby=date&order=desc`;

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

    return posts.slice(0, limit);
  } catch (error) {
    console.error("Error fetching popular posts:", error);
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogPostFromWordPress(id);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const seo = post.yoast_head_json;

  return {
    title: seo?.title || post.title.rendered,
    description:
      seo?.description || post.excerpt.rendered.replace(/<[^>]*>/g, ""),
    openGraph: {
      title: seo?.title || post.title.rendered,
      description:
        seo?.description || post.excerpt.rendered.replace(/<[^>]*>/g, ""),
      images: seo?.og_image
        ? [
            {
              url: seo.og_image[0].url,
              width: seo.og_image[0].width,
              height: seo.og_image[0].height,
            },
          ]
        : [],
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchBlogPostFromWordPress(id);

  if (!post) {
    notFound();
  }

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

  const authorName = post.uagb_author_info?.display_name || "Unknown Author";
  // Normalize author link to remove opus-virtual-offices- prefix if present
  const rawAuthorLink = post.uagb_author_info?.author_link || "#";
  const authorLink = rawAuthorLink.replace(/\/opus-virtual-offices-author\//g, '/author/');
  const postUrl = `https://www.opusvirtualoffices.com/blog/${id}/`;

  // Fetch 3 popular posts (excluding current post)
  const popularPosts = await fetchPopularPosts(post.id, 3);

  return (
    <>
      <article className="min-h-screen bg-white flex flex-col">
        <div className="max-w-[792px] mx-auto pt-[112px] md:pt-[184px] px-[16px] pb-[40px] mb-[80px] border-b border-gray-200">
          {/* Date */}
          <div className="text-center mb-4">
            <time
              dateTime={post.date}
              className="text-[16px] text-[#026AA2] font-semibold mb-[12px]"
            >
              Published {formatDate(post.date)}
            </time>
          </div>

          {/* Title */}
          <h1
            className=" text-[#181d27] text-[48px] font-semibold leading-[60px] text-center mb-[24px]"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          <div className="text-[#475467] text-[20px] text-center mb-[32px] md:hidden">
            How do you create compelling presentations that wow your colleagues
            and impress your managers? Find out with our in-depth guide on UX
            presentations.
          </div>
          <div className="md:hidden flex items-center gap-2 flex-row justify-center mb-[24px]">
            <div className="text-[14px] text-[#026AA2] border-[1px] border-[#FFB2B5] bg-[#FFE5E6] rounded-[16px] px-[10px] py-[2px]">
              Design
            </div>
            <div className="text-[14px] text-[#3538CD] border-[1px] border-[#C7D7FE] bg-[#EEF4FF] rounded-[16px] px-[10px] py-[2px]">
              Research
            </div>
            <div className="text-[14px] text-[#C11574] border-[1px] border-[#FCCEEE] bg-[#FDF2FA] rounded-[16px] px-[10px] py-[2px]">
              Presentation
            </div>
          </div>

          {/* Featured Image */}
          {featuredImage && (
            <div className="relative w-full mb-8 sm:mb-12 aspect-video overflow-hidden rounded-lg">
              <Image
                src={featuredImage.source_url}
                alt={featuredImage.alt_text || post.title.rendered}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
              />
            </div>
          )}

          {/* Author and Social Share */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between  mb-[40px] pb-[24px] border-b border-gray-200 gap-[24px]">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <div className="w-full h-full bg-[#016aa2] flex items-center justify-center text-white font-semibold">
                  <Image
                    src={"/assets/Avatar.png"}
                    alt={authorName}
                    width={56}
                    height={56}
                  />
                </div>
              </div>
              <div>
                <p className="text-[16px] font-semibold text-primary">
                  {authorName}
                </p>
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  postUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                aria-label="Share on Facebook"
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1293_24617)">
                    <path
                      d="M40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 29.9824 7.31367 38.2566 16.875 39.757V25.7813H11.7969V20H16.875V15.5938C16.875 10.5813 19.8609 7.8125 24.4293 7.8125C26.6168 7.8125 28.9062 8.20312 28.9062 8.20312V13.125H26.3844C23.9 13.125 23.125 14.6668 23.125 16.25V20H28.6719L27.7852 25.7813H23.125V39.757C32.6863 38.2566 40 29.9824 40 20Z"
                      fill="#1877F2"
                    />
                    <path
                      d="M27.7852 25.7812L28.6719 20H23.125V16.25C23.125 14.6684 23.9 13.125 26.3844 13.125H28.9062V8.20312C28.9062 8.20312 26.6176 7.8125 24.4293 7.8125C19.8609 7.8125 16.875 10.5813 16.875 15.5938V20H11.7969V25.7812H16.875V39.757C18.9457 40.081 21.0543 40.081 23.125 39.757V25.7812H27.7852Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1293_24617">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  postUrl
                )}&text=${encodeURIComponent(post.title.rendered)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-80 transition-opacity"
                aria-label="Share on Twitter"
              >
                <svg
                  className="w-[40px] h-[40px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  postUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077B5] hover:opacity-80 transition-opacity"
                aria-label="Share on LinkedIn"
              >
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1293_24619)">
                    <path
                      d="M37.0803 0H2.95541C2.17159 0 1.41987 0.311374 0.865621 0.865621C0.311374 1.41987 0 2.17159 0 2.95541V37.0803C0 37.8641 0.311374 38.6158 0.865621 39.1701C1.41987 39.7243 2.17159 40.0357 2.95541 40.0357H37.0803C37.8641 40.0357 38.6158 39.7243 39.1701 39.1701C39.7243 38.6158 40.0357 37.8641 40.0357 37.0803V2.95541C40.0357 2.17159 39.7243 1.41987 39.1701 0.865621C38.6158 0.311374 37.8641 0 37.0803 0ZM11.9329 34.1054H5.91361V14.9856H11.9329V34.1054ZM8.91907 12.336C8.23629 12.3322 7.56995 12.1261 7.00414 11.744C6.43833 11.3618 5.99842 10.8205 5.73992 10.1886C5.48141 9.5566 5.41591 8.86223 5.55167 8.19307C5.68743 7.52391 6.01837 6.90996 6.50273 6.4287C6.98708 5.94745 7.60314 5.62046 8.27316 5.489C8.94317 5.35754 9.63712 5.4275 10.2674 5.69005C10.8977 5.95261 11.4361 6.39598 11.8146 6.96423C12.1932 7.53248 12.3949 8.20013 12.3944 8.88293C12.4008 9.34005 12.3152 9.7938 12.1425 10.2171C11.9699 10.6404 11.7138 11.0247 11.3894 11.3469C11.0651 11.6691 10.6793 11.9228 10.2549 12.0927C9.83043 12.2626 9.37615 12.3454 8.91907 12.336ZM34.1193 34.1221H28.1028V23.6767C28.1028 20.5962 26.7933 19.6453 25.103 19.6453C23.318 19.6453 21.5665 20.9909 21.5665 23.7545V34.1221H15.5472V14.9995H21.3357V17.6491H21.4135C21.9946 16.473 24.0298 14.4629 27.1353 14.4629C30.4939 14.4629 34.1221 16.4563 34.1221 22.2949L34.1193 34.1221Z"
                      fill="#0A66C2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1293_24619">
                      <rect width="40.0357" height="40.0357" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
                  postUrl
                )}&description=${encodeURIComponent(post.title.rendered)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#BD081C] hover:opacity-80 transition-opacity"
                aria-label="Share on Pinterest"
              >
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1293_24620)">
                    <path
                      d="M20.0179 40.0357C31.0734 40.0357 40.0357 31.0734 40.0357 20.0179C40.0357 8.9623 31.0734 0 20.0179 0C8.9623 0 0 8.9623 0 20.0179C0 31.0734 8.9623 40.0357 20.0179 40.0357Z"
                      fill="white"
                    />
                    <path
                      d="M20.0179 0C8.96273 0 0 8.96273 0 20.0179C0 28.5028 5.27219 35.7521 12.7192 38.6682C12.5379 37.0866 12.3897 34.6482 12.7851 32.9183C13.1475 31.3531 15.1246 22.967 15.1246 22.967C15.1246 22.967 14.5315 21.7643 14.5315 20.0014C14.5315 17.217 16.1461 15.1411 18.1561 15.1411C19.8696 15.1411 20.6934 16.4262 20.6934 17.9584C20.6934 19.6719 19.606 22.2421 19.0293 24.631C18.5515 26.6246 20.0343 28.2557 21.9949 28.2557C25.5537 28.2557 28.2886 24.4992 28.2886 19.0952C28.2886 14.3008 24.8452 10.9563 19.919 10.9563C14.2184 10.9563 10.8739 15.2235 10.8739 19.6389C10.8739 21.3524 11.5329 23.1976 12.3567 24.2027C12.5215 24.4004 12.5379 24.5816 12.4885 24.7793C12.3402 25.4054 11.9942 26.7729 11.9283 27.0529C11.846 27.4154 11.6318 27.4978 11.2528 27.3165C8.74854 26.1468 7.18336 22.5057 7.18336 19.5565C7.18336 13.2464 11.7636 7.44697 20.4133 7.44697C27.3495 7.44697 32.7535 12.3897 32.7535 19.0128C32.7535 25.9161 28.4039 31.4684 22.3739 31.4684C20.3474 31.4684 18.4362 30.414 17.7936 29.1618C17.7936 29.1618 16.7886 32.9842 16.5415 33.9233C16.0967 35.6697 14.8775 37.8445 14.0537 39.179C15.9319 39.7556 17.909 40.0687 19.9849 40.0687C31.04 40.0687 40.0028 31.1059 40.0028 20.0508C40.0357 8.96273 31.073 0 20.0179 0Z"
                      fill="#E60019"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1293_24620">
                      <rect width="40.0357" height="40.0357" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#181d27] prose-p:text-[#535862] prose-a:text-[#016aa2] prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:w-full prose-img:h-auto"
            dangerouslySetInnerHTML={{
              __html: cleanWordPressHtml(post.content.rendered),
            }}
          />
        </div>
        <div className="pt-[64px] md:pt-[48px] pb-[64px] md:pb-[48px] max-w-[1280px] mx-auto flex flex-col items-center justify-center">
          <div className="md:px-[32px] px-[16px] flex-1 ">
            <h2 className="font-semibold text-[36px] text-primary text-center">
              Get Your Office Solution Today!
            </h2>
            <p className="mt-[16px] md:mt-[20px] text-[#535862] text-[20px] text-center">
              Join over 20,000+ businesses already growing with Opus VO.
            </p>
            <div className="w-full flex justify-center items-center mt-[32px]">
              <button className="py-[12px] px-[20px] rounded-[8px] bg-[#36BFFA] text-white text-[16px] font-semibold w-full sm:w-auto">
                Get started
              </button>
            </div>
          </div>
        </div>
        {popularPosts.length > 0 && (
          <div className="pt-[64px] md:pt-[96px] pb-[64px] md:pb-[96px] w-full flex-1 max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between px-[16px] md:px-[32px] w-full flex-1 mb-[64px]">
              <h2 className="text-[36px] text-primary font-semibold">
                Related Posts
              </h2>
              <a
                href="/blog"
                className="hidden md:block py-[12px] px-[20px] rounded-[8px] bg-[#36BFFA] text-white text-[16px] font-semibold hover:opacity-90 transition-opacity"
              >
                View all posts
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] px-[16px] md:px-[32px]">
              {popularPosts.map((relatedPost) => {
                const relatedFeaturedImage =
                  relatedPost._embedded?.["wp:featuredmedia"]?.[0] ||
                  (relatedPost.uagb_featured_image_src?.full && {
                    source_url: relatedPost.uagb_featured_image_src.full[0],
                    media_details: {
                      width: relatedPost.uagb_featured_image_src.full[1],
                      height: relatedPost.uagb_featured_image_src.full[2],
                    },
                    alt_text: relatedPost.title.rendered,
                  });

                // Extract slug from link or use slug field
                const postSlug =
                  relatedPost.slug ||
                  relatedPost.link?.split("/").filter(Boolean).pop() ||
                  "";

                return (
                  <a
                    key={relatedPost.id}
                    href={`/blog/${postSlug}`}
                    className="flex flex-col group hover:opacity-90 transition-opacity"
                  >
                    {relatedFeaturedImage && (
                      <div className="relative w-full aspect-video overflow-hidden rounded-lg mb-[20px] h-[280px]">
                        <Image
                          src={relatedFeaturedImage.source_url}
                          alt={
                            relatedFeaturedImage.alt_text ||
                            relatedPost.title.rendered
                          }
                          fill
                          className="object-cover group-hover:scale-105  transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                      </div>
                    )}
                    <h3
                      className="text-[24px] font-semibold text-[#181d27] mb-2 line-clamp-2  transition-colors"
                      dangerouslySetInnerHTML={{
                        __html: relatedPost.title.rendered,
                      }}
                    />
                    {relatedPost.excerpt?.rendered && (
                      <p
                        className="text-[16px] text-[#535862] line-clamp-3 mb-2"
                        dangerouslySetInnerHTML={{
                          __html: relatedPost.excerpt.rendered.replace(
                            /<[^>]*>/g,
                            ""
                          ),
                        }}
                      />
                    )}
                    <time
                      dateTime={relatedPost.date}
                      className="text-[16px] text-[#535862] font-medium mb-[24px]"
                    >
                      {formatDate(relatedPost.date)}
                    </time>
                    <div className=" items-center gap-[8px] text-[#026AA2] hidden md:flex">
                      <span className="text-[16px] font-semibold ">
                        Read post
                      </span>
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
                  </a>
                );
              })}
              <div className="flex justify-center items-center md:hidden w-full flex-1">
                <a
                  href="/blog"
                  className="py-[12px] w-full text-center px-[20px] rounded-[8px] bg-[#36BFFA] text-white text-[16px] font-semibold hover:opacity-90 transition-opacity"
                >
                  View all posts
                </a>
              </div>
            </div>
          </div>
        )}
        <div className="pt-[40px] md:pt-[40px] pb-[20px] md:pb-[40px]">
          <PopularLocations
            description="Over 650 Locations Across the USA"
            description2="All-Inclusive Virtual Office Services for Only $99"
          />
        </div>
      </article>
      <Footer />
    </>
  );
}
