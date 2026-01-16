import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Footer } from '@/app/components/Footer';

interface VideoConfig {
  title: string;
  description: string;
  videoId: string;
}

const videoConfigs: Record<string, VideoConfig> = {
  'electrician': {
    title: "Who Answers Your Calls While You're on an electrical Job?",
    description: "For electricians missed calls mean missed jobs. Opus Virtual Offices provides live receptionist call answering so contractors never miss a client or opportunity.",
    videoId: '7MIgS4vWlR8',
  },
  'home-services': {
    title: "Who Answers Your Calls While You're on the Job?",
    description: "Missed calls mean missed jobs. Opus Virtual Offices provides live receptionist call answering so contractors never miss a client or opportunity.",
    videoId: 'NIE0ERP2CmI',
  },
  'plumber': {
    title: "Who Answers Your Calls While You're on an plumbing Job?",
    description: "For plumbers missed calls mean missed jobs. Opus Virtual Offices provides live receptionist call answering so contractors never miss a client or opportunity.",
    videoId: 'UwE4xFcg6nw',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = videoConfigs[slug];

  if (!config) {
    return {
      title: 'Video Not Found | Opus Virtual Offices',
    };
  }

  return {
    title: config.title,
    description: config.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(videoConfigs).map((slug) => ({
    slug,
  }));
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = videoConfigs[slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="w-full flex pt-[72px] lg:pt-[104px]">
      <div className="flex w-full flex-col items-start">
        <main className="flex w-full flex-col items-center bg-basewhite px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 md:pt-10 pb-10">
          <div className="w-full max-w-5xl">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-shadows-shadow-lg"
                src={`https://www.youtube.com/embed/${config.videoId}?rel=0&modestbranding=1&autohide=1`}
                title={config.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
