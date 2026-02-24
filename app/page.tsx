"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { labs } from '@/lib/data';
import { MonitorPlay, Users, Clock, TrendingUp, ExternalLink, LogIn, Mail } from 'lucide-react';

type NewsArticle = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
};

export default function PublicHomePage() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const availableLabs = labs.filter(lab => lab.status === 'Available').length;
  const totalCapacity = labs.reduce((sum, lab) => sum + lab.capacity, 0);

  useEffect(() => {
    fetchTechNews();
    
    const interval = setInterval(() => {
      fetchTechNews();
    }, 30 * 60 * 1000); // 30 menit

    return () => clearInterval(interval);
  }, []);

  const fetchTechNews = async () => {
    setNewsLoading(true);
    try {
      const response = await fetch('/api/news');
      
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNewsArticles(data.articles || []);
      setLastUpdate(new Date(data.lastUpdate));
    } catch (error) {
      console.error('Failed to fetch news:', error);
      const mockNews: NewsArticle[] = [
        {
          title: 'AI Generative Tools Revolutionize Education',
          description: 'Schools adopt AI-powered platforms for personalized learning.',
          url: '#',
          publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: 'TechCrunch',
        },
      ];
      setNewsArticles(mockNews);
      setLastUpdate(new Date());
    } finally {
      setNewsLoading(false);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date().getTime();
    const published = new Date(dateString).getTime();
    const diffInHours = Math.floor((now - published) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Baru saja';
    if (diffInHours < 24) return `${diffInHours} jam lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari lalu`;
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google SSO dengan NextAuth.js atau Firebase Auth
    // Untuk demo, redirect ke login page standar
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-600 flex items-center justify-center">
              <MonitorPlay className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Lab Portal</h1>
              <p className="text-xs text-slate-500">SMK Telkom Malang</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login Demo
            </Link>
            <button
              onClick={handleGoogleLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-medium transition-colors"
            >
              <Mail className="h-4 w-4" />
              Login Google SSO
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Laboratorium Komputer SMK Telkom Malang
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Portal informasi real-time untuk ketersediaan laboratorium, jadwal penggunaan, dan berita teknologi terkini.
          </p>
        </div>

        {/* Lab Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <MonitorPlay className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Total Laboratorium</p>
                <h3 className="text-3xl font-bold text-slate-900">{labs.length}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <Clock className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Tersedia Sekarang</p>
                <h3 className="text-3xl font-bold text-slate-900">{availableLabs}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Kapasitas Total</p>
                <h3 className="text-3xl font-bold text-slate-900">{totalCapacity}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Lab Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Daftar Laboratorium</h3>
            <p className="text-sm text-slate-500">Update real-time</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900">{lab.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{lab.type}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    lab.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                    lab.status === 'In Use' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lab.status === 'Available' ? 'Tersedia' : lab.status === 'In Use' ? 'Digunakan' : 'Perbaikan'}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{lab.description}</p>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Users className="h-4 w-4" />
                  <span>{lab.capacity} Kursi</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech News Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-red-600" />
              <h3 className="text-2xl font-bold text-slate-900">Berita Teknologi Terkini</h3>
            </div>
            <div className="text-sm text-slate-500">
              Update terakhir: {lastUpdate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {newsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {newsArticles.map((article, index) => (
                <a
                  key={index}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                      {article.source}
                    </span>
                    <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {article.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatTimeAgo(article.publishedAt)}
                  </p>
                </a>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Berita diperbarui otomatis setiap 30 menit • Sumber: Agregasi berita teknologi
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-slate-50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">
              © 2026 SMK Telkom Malang. Portal Laboratorium Komputer.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-600">
              <Link href="/login" className="hover:text-red-600 transition-colors">Login Portal</Link>
              <a href="#" className="hover:text-red-600 transition-colors">Bantuan</a>
              <a href="#" className="hover:text-red-600 transition-colors">Kontak</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
