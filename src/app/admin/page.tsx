'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { FiFileText, FiStar, FiPlus, FiEdit, FiTrendingUp, FiSettings, FiYoutube } from 'react-icons/fi';
import { getAllReferencesAdmin } from '@/lib/references';
import { getAllReviewsAdmin } from '@/lib/supabase-reviews';
import { Reference } from '@/types/reference';
import { Review } from '@/lib/supabase-reviews';
import { SiteSettings } from '@/lib/site-settings';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [references, setReferences] = useState<Reference[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    loadData();
  }, [router]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [refsData, reviewsData, settingsData] = await Promise.all([
        getAllReferencesAdmin(),
        getAllReviewsAdmin(),
        fetch('/api/site-settings').then(res => res.json()),
      ]);
      setReferences(refsData);
      setReviews(reviewsData);
      if (settingsData) {
        setSiteSettings(settingsData);
        setYoutubeUrl(settingsData.hero_youtube_url || '');
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const response = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hero_youtube_url: youtubeUrl || null,
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Speichern');
      }

      const result = await response.json();
      setSiteSettings(result.data);
      alert('Einstellungen erfolgreich gespeichert!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Fehler beim Speichern der Einstellungen');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const publishedReferences = references.filter((r) => r.is_published).length;
  const unpublishedReferences = references.length - publishedReferences;
  const featuredReviews = reviews.filter((r) => r.is_featured).length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Willkommen im Admin-Bereich. Verwalten Sie Ihre Inhalte.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Referenzen Statistik */}
          <div className="glass-strong rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center">
                <FiFileText className="w-6 h-6 text-brand" />
              </div>
              <span className="text-3xl font-black text-white">
                {references.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Referenzen
            </h3>
            <p className="text-sm text-gray-400">
              {publishedReferences} veröffentlicht, {unpublishedReferences}{' '}
              Entwürfe
            </p>
          </div>

          {/* Rezensionen Statistik */}
          <div className="glass-strong rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <FiStar className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-3xl font-black text-white">
                {reviews.length}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Rezensionen
            </h3>
            <p className="text-sm text-gray-400">
              {featuredReviews} Highlights
            </p>
          </div>

          {/* Quick Actions */}
          <div className="glass-strong rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Schnellzugriff
            </h3>
            <div className="space-y-2">
              <Link
                href="/admin/referenzen/new"
                className="block w-full px-4 py-2 bg-brand/20 hover:bg-brand/30 text-brand rounded-lg transition-colors text-sm font-medium text-center"
              >
                Neue Referenz
              </Link>
              <Link
                href="/admin/rezensionen/new"
                className="block w-full px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors text-sm font-medium text-center"
              >
                Neue Rezension
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Referenzen Section */}
          <div className="glass-strong rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Referenzen</h2>
              <Link
                href="/admin/referenzen"
                className="text-brand hover:text-brand/80 text-sm font-medium"
              >
                Alle anzeigen →
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Lädt...</div>
            ) : references.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-4">Noch keine Referenzen vorhanden</p>
                <Link
                  href="/admin/referenzen/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Erste Referenz erstellen
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {references.slice(0, 5).map((ref) => (
                  <Link
                    key={ref.id}
                    href={`/admin/referenzen/edit/${ref.id}`}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium truncate">
                          {ref.title}
                        </span>
                        {ref.is_published ? (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                            Veröffentlicht
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-gray-500/20 text-gray-400 text-xs rounded">
                            Entwurf
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {ref.subtitle || 'Kein Untertitel'}
                      </p>
                    </div>
                    <FiEdit className="w-4 h-4 text-gray-400 group-hover:text-brand transition-colors flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Rezensionen Section */}
          <div className="glass-strong rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Rezensionen</h2>
              <Link
                href="/admin/rezensionen"
                className="text-brand hover:text-brand/80 text-sm font-medium"
              >
                Alle anzeigen →
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-400">Lädt...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="mb-4">Noch keine Rezensionen vorhanden</p>
                <Link
                  href="/admin/rezensionen/new"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  Erste Rezension erstellen
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.slice(0, 5).map((review) => (
                  <Link
                    key={review.id}
                    href={`/admin/rezensionen/edit/${review.id}`}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium truncate">
                          {review.customer_name}
                        </span>
                        {review.is_featured && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                            Highlight
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {review.company_name || 'Keine Firma'}
                      </p>
                    </div>
                    <FiEdit className="w-4 h-4 text-gray-400 group-hover:text-brand transition-colors flex-shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Site Settings Section */}
        <div className="glass-strong rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <FiSettings className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Website-Einstellungen</h2>
          </div>

          <div className="space-y-6">
            {/* Hero Section YouTube URL */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <FiYoutube className="inline-block w-4 h-4 mr-2" />
                Hero Section YouTube URL
              </label>
              <p className="text-xs text-gray-400 mb-3">
                YouTube URL oder Video-ID für den Player auf der Landing Page
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=VIDEO_ID oder nur VIDEO_ID"
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <button
                  onClick={handleSaveSettings}
                  disabled={isSavingSettings}
                  className="px-6 py-2 bg-brand hover:bg-brand/80 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSavingSettings ? 'Speichert...' : 'Speichern'}
                </button>
              </div>
              {siteSettings?.hero_youtube_url && (
                <p className="text-xs text-green-400 mt-2">
                  ✓ Aktuell gesetzt: {siteSettings.hero_youtube_url}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

