'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllReviewsAdmin } from '@/lib/supabase-reviews';
import { Review } from '@/lib/supabase-reviews';
import { FiPlus, FiEdit, FiTrash2, FiStar, FiLink } from 'react-icons/fi';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadReviews();
  }, [router]);

  useEffect(() => {
    const handleFocus = () => {
      loadReviews();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadReviews = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllReviewsAdmin();
      setReviews(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Laden';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Rezension wirklich löschen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Fehler beim Löschen');
        return;
      }

      loadReviews();
    } catch (err) {
      alert('Fehler beim Löschen');
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-gray-400">Lädt...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Rezensionen verwalten
          </h1>
          <Link
            href="/admin/rezensionen/new"
            className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Neue Rezension
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-6">Noch keine Rezensionen vorhanden.</p>
            <Link
              href="/admin/rezensionen/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Erste Rezension erstellen
            </Link>
          </div>
        ) : (
          <div className="glass rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Kunde / Firma
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Bewertung
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Projekttyp
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Zuordnung
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{review.customer_name}</div>
                      {review.company_name && (
                        <div className="text-gray-400 text-sm">{review.company_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 text-sm">
                        {review.project_type || '-'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {review.is_featured ? (
                          <>
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded">
                              Featured
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400 text-xs">Normal</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {review.reference_id ? (
                        <Link
                          href={`/admin/referenzen/edit/${review.reference_id}`}
                          className="flex items-center gap-1 text-brand hover:text-brand/80 text-sm"
                        >
                          <FiLink className="w-4 h-4" />
                          Zu Referenz
                        </Link>
                      ) : (
                        <span className="text-gray-400 text-sm">Keine Zuordnung</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/rezensionen/edit/${review.id}`}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <FiEdit className="w-5 h-5 text-gray-400" />
                        </Link>
                        <button
                          onClick={() => handleDelete(review.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5 text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

