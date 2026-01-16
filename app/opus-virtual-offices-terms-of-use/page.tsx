import type { Metadata } from 'next';
import { Footer } from '../components/Footer';
import { getSeoMetadata } from '../lib/seo';
import { fetchTermsOfUse } from '../lib/api/termsOfUse';
import { cleanWordPressHtml } from '../lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  try {
    return await getSeoMetadata('opus-virtual-offices-terms-of-use');
  } catch {
    return {
      title: 'Terms of Use | Opus Virtual Offices',
      description: 'Opus Virtual Offices terms of use. Please read these terms carefully before using our services.',
    };
  }
}

export default async function TermsOfUsePage() {
  let termsOfUseData;
  
  try {
    termsOfUseData = await fetchTermsOfUse();
  } catch (error) {
    termsOfUseData = null;
  }

  const content = termsOfUseData?.data?.content || '';
  const cleanedContent = cleanWordPressHtml(content);

  return (
    <div className="bg-white pt-[72px] lg:pt-[104px]">
      <section className="w-full flex justify-center bg-white pt-5 lg:pt-10 pb-[20px] lg:pb-[40px]">
        <div className="max-w-[1280px] w-full px-8 mx-auto">
          <div className="max-w-[720px] mx-auto">
            {cleanedContent ? (
              <div 
                className="rendered-html-content text-left text-[18px] leading-[28px] text-[#475467] font-normal"
                dangerouslySetInnerHTML={{ __html: cleanedContent }}
              />
            ) : (
              <div className="text-center mb-20">
                <h1 className="font-semibold text-[48px] leading-[60px] text-[#101828] mb-6">
                  Opus Virtual Offices Terms Of Use
                </h1>
                <p className="text-[20px] leading-[30px] text-[#475467] font-normal">
                  Please read these terms carefully before using our services.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
