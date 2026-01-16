import fs from 'fs';
import path from 'path';

export interface TermsOfUseResponse {
  success: boolean;
  data?: {
    id?: number;
    slug?: string;
    title?: string;
    content?: string;
    excerpt?: string;
    modified?: string;
    url?: string;
    date?: string;
  };
  seo?: {
    title?: string;
    meta_description?: string;
    canonical?: string;
    og?: {
      title?: string;
      description?: string;
      url?: string;
      type?: string;
      image?: string;
    };
  };
}

export async function fetchTermsOfUse(): Promise<TermsOfUseResponse> {
  try {
    const jsonFilePath = path.join(process.cwd(), 'newsite', 'json', 'opus-virtual-offices-terms-of-use.json');

    const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    const data: TermsOfUseResponse = JSON.parse(fileContent);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchTermsOfUseDate(): Promise<string> {
  try {
    const data = await fetchTermsOfUse();

    let dateString = data.data?.modified || data.data?.date;

    if (dateString) {
      const dateOnly = dateString.split(' ')[0];
      const date = new Date(dateOnly);

      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    }

    throw new Error('Date not found in JSON response');
  } catch (error) {
    throw error;
  }
}
