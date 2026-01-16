import { WordPressPost } from "@/app/blog/[id]/page";

// Extender la interfaz WordPressPost para incluir author en _embedded
interface WordPressPostWithAuthor extends WordPressPost {
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      media_details: {
        width: number;
        height: number;
      };
      alt_text?: string;
    }>;
    author?: Array<{
      id: number;
      name: string;
      slug: string;
      description?: string;
      avatar_urls?: {
        24?: string;
        48?: string;
        96?: string;
      };
      acf?: {
        author_title?: string;
        author_bio?: string;
        facebook_url?: string;
        twitter_url?: string;
        linkedin_url?: string;
      };
    }>;
  };
}
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/Footer";
import { PopularLocations } from "@/app/components/PopularLocations";
import { notFound } from "next/navigation";
import OfficeSolutionBanner from "@/app/components/OfficeSolutionBanner";
import { Metadata } from "next";

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  description?: string;
  avatar_urls?: {
    24?: string;
    48?: string;
    96?: string;
  };
  acf?: {
    author_title?: string;
    author_bio?: string;
    facebook_url?: string;
    twitter_url?: string;
    linkedin_url?: string;
  };
}

async function fetchAuthorInfoFromPosts(slug: string): Promise<{ author: WordPressAuthor; authorId: number } | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=50&orderby=date&order=desc`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
        next: { revalidate: 3600 },
        signal: controller.signal,
    });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const posts: WordPressPostWithAuthor[] = await response.json();

      if (!posts || posts.length === 0) {
        return null;
      }

      let authorEmbeddedData: any = null;
      const firstPostWithAuthor = posts.find(p => p.author);
      if (firstPostWithAuthor && !firstPostWithAuthor._embedded?.author) {
        try {
          const embedUrl = `${baseUrl}/wp-json/wp/v2/posts/${firstPostWithAuthor.id}?_embed=true`;
          const embedResponse = await fetch(embedUrl, {
            headers: { "Content-Type": "application/json" },
            next: { revalidate: 3600 },
          });
          if (embedResponse.ok) {
            const embedPost: any = await embedResponse.json();
            authorEmbeddedData = embedPost._embedded?.author?.[0];
          }
        } catch (e) {
          // Silently fail
        }
      }

      for (const post of posts) {
        if (post.uagb_author_info?.author_link) {
          const authorLink = post.uagb_author_info.author_link;
          const urlParts = authorLink.split('/author/');
          if (urlParts.length > 1) {
            const authorSlugFromLink = urlParts[1].split('/').filter(Boolean)[0];
            
            if (authorSlugFromLink && authorSlugFromLink.toLowerCase() === slug.toLowerCase()) {
              
              // Intentar obtener información completa del autor desde _embedded
              let authorData: WordPressAuthor = {
                id: post.author,
                name: post.uagb_author_info.display_name || "Unknown Author",
                slug: authorSlugFromLink,
                description: "",
                acf: {
                  author_title: "Content Strategist",
                  author_bio: "",
                },
              };

              const embeddedAuthor = post._embedded?.author?.[0] || authorEmbeddedData;
              if (embeddedAuthor) {
                const embeddedAcf = embeddedAuthor.acf as WordPressAuthor['acf'] | undefined;
                
                authorData = {
                  id: embeddedAuthor.id || post.author,
                  name: embeddedAuthor.name || post.uagb_author_info.display_name || "Unknown Author",
                  slug: authorSlugFromLink,
                  description: embeddedAuthor.description || "",
                  avatar_urls: embeddedAuthor.avatar_urls,
                  acf: embeddedAcf ? {
                    author_title: embeddedAcf.author_title || "Content Strategist",
                    author_bio: embeddedAcf.author_bio || "",
                    facebook_url: embeddedAcf.facebook_url,
                    twitter_url: embeddedAcf.twitter_url,
                    linkedin_url: embeddedAcf.linkedin_url,
                  } : {
                    author_title: "Content Strategist",
                    author_bio: "",
                  },
                };
              }

              return {
                author: authorData,
                authorId: post.author,
              };
            }
          }
        }
      }

      return null;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return null;
      }
      return null;
    }
  } catch (error) {
    return null;
  }
}

async function fetchPostsByAuthor(
  authorId: number,
  page: number = 1,
  perPage: number = 9
): Promise<{ posts: WordPressPost[]; totalPages: number } | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_WORDPRESS_URL ||
      "https://www.opusvirtualoffices.com";

    const apiUrl = `${baseUrl}/wp-json/wp/v2/posts?per_page=100&orderby=date&order=desc`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
        next: { revalidate: 3600 },
        signal: controller.signal,
    });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return null;
      }

      const allPosts: WordPressPost[] = await response.json();

      const authorPosts = allPosts.filter(post => post.author === authorId);

      const totalPosts = authorPosts.length;
      const totalPages = Math.max(1, Math.ceil(totalPosts / perPage));
      
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedPosts = authorPosts.slice(startIndex, endIndex);

      // Return empty array instead of null if no posts found
      if (!paginatedPosts || paginatedPosts.length === 0) {
        return { posts: [], totalPages: 0 };
      }

      return { posts: paginatedPosts, totalPages };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return null;
      }
      return null;
    }
  } catch (error) {
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const authorInfo = await fetchAuthorInfoFromPosts(id);

  if (!authorInfo) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${authorInfo.author.name} - Author`,
    description: authorInfo.author.description || `Posts by ${authorInfo.author.name}`,
  };
}

export default async function AuthorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const searchParamsResolved = await searchParams;
  const currentPage = parseInt(searchParamsResolved.page || "1", 10);

  const authorInfo = await fetchAuthorInfoFromPosts(id);

  if (!authorInfo) {
    notFound();
  }

  const { author, authorId } = authorInfo;
  const postsPerPage = 9;
  const blogData = await fetchPostsByAuthor(
    authorId,
    currentPage,
    postsPerPage
  );

  if (!blogData || !blogData.posts || blogData.posts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="pt-[92px] md:pt-[144px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto px-[16px] md:px-[32px]">
          <div className="p-[16px] md:p-[64px] shadow-3xl rounded-[16px] mb-[64px] md:mb-[96px]">
            <div className="flex items-center gap-3 mb-[40px] pb-[24px] border-b border-gray-200">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {author.avatar_urls?.[96] ? (
                  <Image
                    src={author.avatar_urls[96]}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#016aa2] flex items-center justify-center text-white font-semibold">
                    {author.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  {author.name}
                </p>
                <p className="text-[12px] md:text-[16px] text-[#535862]">
                  {author.acf?.author_title || "Content Strategist"}, Opus Virtual Offices
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-[36px] text-primary font-semibold mb-8">
            {author.name}
          </h1>
          <p className="text-[16px] text-[#535862]">No posts found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const { posts, totalPages } = blogData;
  const validTotalPages = Math.max(1, totalPages || 1);

  const authorBio = author.acf?.author_bio || author.description || "";
  const authorTitle = author.acf?.author_title || "Content Strategist";

  return (
    <div className="bg-white flex flex-col">
      <div className="pt-[92px] md:pt-[144px] pb-[20px] md:pb-[40px] w-full flex-1 max-w-[1280px] mx-auto px-[16px] md:px-[32px]">
        <div className="p-[16px] md:p-[64px] shadow-3xl rounded-[16px] mb-[64px] md:mb-[96px]">
          <div className="flex flex-row items-start md:items-center justify-between mb-[40px] pb-[24px] border-b border-gray-200 gap-[24px]">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {author.avatar_urls?.[96] ? (
                  <Image
                    src={author.avatar_urls[96]}
                    alt={author.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#016aa2] flex items-center justify-center text-white font-semibold">
                    {author.name.charAt(0).toUpperCase()}
                </div>
                )}
              </div>
              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  {author.name}
                </p>
                <p className="text-[12px] md:text-[16px] text-[#535862] flex flex-col md:flex-row">
                  <span>{authorTitle}, </span>
                  <span>Opus Virtual Offices</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {author.acf?.facebook_url && (
              <a
                  href={author.acf.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1877F2] hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
              >
                <svg
                  className="w-[21.56px] h-[21.56px] md:w-[40px] md:h-[40px]"
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
              )}
              {author.acf?.twitter_url && (
              <a
                  href={author.acf.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-80 transition-opacity"
                  aria-label="Twitter"
              >
                <svg
                  className="w-[21.56px] h-[21.56px] md:w-[40px] md:h-[40px]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              )}
              {author.acf?.linkedin_url && (
              <a
                  href={author.acf.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077B5] hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
              >
                <svg
                  className="w-[21.56px] h-[21.56px] md:w-[41px] md:h-[41px]"
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
              )}
            </div>
          </div>
          {authorBio && (
          <div className="gap-[15px] flex flex-col text-[20px] text-gray-600">
              {authorBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
          </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] gap-y-[48px] px-[16px] md:px-[32px] pb-[64px] border-b-[1px] border-gray-200">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-[16px] text-[#535862] col-span-full">
              No posts found for this author.
            </p>
          )}
        </div>

        {validTotalPages > 1 && (
          <div className="px-[16px] md:px-[32px] mt-[20px] mb-[20px] md:mb-[40px]">
            <div className="flex items-center justify-between gap-[8px] md:hidden">
              {currentPage > 1 ? (
                <Link
                  href={`/author/${id}?page=${currentPage - 1}`}
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

              <div className="text-[14px] font-medium text-gray-700">
                Page {currentPage} of {validTotalPages}
              </div>

              {currentPage < validTotalPages ? (
                <Link
                  href={`/author/${id}?page=${currentPage + 1}`}
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

            <div className="hidden md:flex items-center justify-between gap-[8px]">
              {currentPage > 1 ? (
                <Link
                  href={`/author/${id}?page=${currentPage - 1}`}
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
                        href={`/author/${id}?page=${page}`}
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

              {currentPage < validTotalPages ? (
                <Link
                  href={`/author/${id}?page=${currentPage + 1}`}
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
        <div className="md:py-[40px] py-[20px]">
          <OfficeSolutionBanner />
        </div>
        <div className="pt-[20px] md:pt-[40px] md:hidden">
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
