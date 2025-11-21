'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/lib/supabase-reviews';
import { getAllReviewsAdmin } from '@/lib/supabase-reviews';
import { FiLink, FiX, FiStar } from 'react-icons/fi';

interface ReferenceReviewsAssignmentProps {
  referenceId: string;
}

export default function ReferenceReviewsAssignment({ referenceId }: ReferenceReviewsAssignmentProps) {
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [assignedReviews, setAssignedReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReviewId, setSelectedReviewId] = useState<string>('');

  useEffect(() => {
    loadReviews();
  }, [referenceId]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const reviews = await getAllReviewsAdmin();
      setAllReviews(reviews);
      
      // Filtere bereits zugeordnete Reviews
      const assigned = reviews.filter(r => r.reference_id === referenceId);
      setAssignedReviews(assigned);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignReview = async () => {
    if (!selectedReviewId) return;

    try {
      const response = await fetch(`/api/reviews/${selectedReviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference_id: referenceId,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Fehler beim Zuordnen');
        return;
      }

      // Lade Reviews neu
      await loadReviews();
      setSelectedReviewId('');
    } catch (error) {
      alert('Fehler beim Zuordnen');
    }
  };

  const handleUnassignReview = async (reviewId: string) => {
    if (!confirm('Möchten Sie diese Rezension von der Referenz entfernen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference_id: null,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        alert(result.error || 'Fehler beim Entfernen');
        return;
      }

      // Lade Reviews neu
      await loadReviews();
    } catch (error) {
      alert('Fehler beim Entfernen');
    }
  };

  // Verfügbare Reviews (nicht zugeordnet oder bereits dieser Referenz zugeordnet)
  const availableReviews = allReviews.filter(
    r => !r.reference_id || r.reference_id === referenceId
  );

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-3 h-3 ${
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
      <div className="glass p-6 rounded-lg">
        <p className="text-gray-400">Lädt Rezensionen...</p>
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Zugeordnete Rezensionen</h2>
        <a
          href="/admin/rezensionen"
          target="_blank"
          className="text-sm text-brand hover:text-brand/80"
        >
          Rezensionen verwalten →
        </a>
      </div>
      <p className="text-gray-400 text-sm">
        Ordnen Sie Rezensionen dieser Referenz zu. Diese werden dann auf der Detail-Seite angezeigt.
      </p>

      {/* Zuordnen */}
      <div className="flex gap-2">
        <select
          value={selectedReviewId}
          onChange={(e) => setSelectedReviewId(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
        >
          <option value="">Rezension auswählen...</option>
          {availableReviews
            .filter(r => r.reference_id !== referenceId)
            .map((review) => (
              <option key={review.id} value={review.id}>
                {review.customer_name}
                {review.company_name ? ` (${review.company_name})` : ''}
                {review.reference_id ? ' [bereits zugeordnet]' : ''}
              </option>
            ))}
        </select>
        <button
          type="button"
          onClick={handleAssignReview}
          disabled={!selectedReviewId}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiLink className="w-4 h-4" />
          Zuordnen
        </button>
      </div>

      {/* Zugeordnete Rezensionen */}
      {assignedReviews.length > 0 ? (
        <div className="space-y-2">
          {assignedReviews.map((review) => (
            <div
              key={review.id}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {review.customer_name}
                      {review.company_name && (
                        <span className="text-gray-400 ml-2">({review.company_name})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {renderStars(review.rating)}
                      {review.is_featured && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleUnassignReview(review.id)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">Noch keine Rezensionen zugeordnet.</p>
      )}
    </div>
  );
}

