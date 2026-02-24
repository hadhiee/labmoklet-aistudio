import { NextResponse } from 'next/server';

export const revalidate = 1800; // 30 menit

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
};

export async function GET() {
  try {
    // Gunakan NewsAPI.org (gratis tier support)
    // Untuk produksi pastikan set NEXT_PUBLIC_NEWS_API_KEY di .env
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    
    if (!apiKey) {
      // Fallback ke mock data jika API key tidak ada
      return NextResponse.json(getMockNews());
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=6&apiKey=${apiKey}`,
      {
        next: { revalidate: 1800 }, // Cache 30 menit
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    
    const articles: NewsArticle[] = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description || 'No description available.',
      url: article.url,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));

    return NextResponse.json({
      articles: articles.slice(0, 4),
      lastUpdate: new Date().toISOString(),
    });
  } catch (error) {
    console.error('News API error:', error);
    // Fallback ke mock data jika fetch gagal
    return NextResponse.json(getMockNews());
  }
}

function getMockNews() {
  const mockArticles: NewsArticle[] = [
    {
      title: 'AI Generative Tools Revolutionize Education in Indonesia',
      description: 'Schools across Indonesia are adopting AI-powered learning platforms to enhance student engagement and personalized education.',
      url: 'https://techcrunch.com/ai-education',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      source: 'TechCrunch',
    },
    {
      title: 'Google Cloud Expands AI Services in Southeast Asia',
      description: 'Google announces new data centers and AI tools specifically designed for ASEAN markets.',
      url: 'https://cloud.google.com/blog',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      source: 'Google Cloud Blog',
    },
    {
      title: 'Cybersecurity Skills Gap: Indonesia Needs 100K Professionals',
      description: 'Industry report highlights urgent demand for cybersecurity talent as digital transformation accelerates.',
      url: 'https://www.wired.com/cybersecurity',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      source: 'Wired',
    },
    {
      title: 'Next.js 16 Released with Enhanced Performance',
      description: 'Vercel announces Next.js 16 with improved server components and faster builds.',
      url: 'https://nextjs.org/blog',
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'Next.js Blog',
    },
  ];

  // Randomize untuk simulasi update berkala
  const shuffled = mockArticles.sort(() => Math.random() - 0.5);

  return {
    articles: shuffled.slice(0, 4),
    lastUpdate: new Date().toISOString(),
    isMock: true,
  };
}
