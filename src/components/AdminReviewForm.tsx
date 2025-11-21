'use client';

import { useState, useEffect } from 'react';
import { Review } from '@/lib/supabase-reviews';
import { FiSave, FiStar } from 'react-icons/fi';

interface AdminReviewFormProps {
  review?: Review;
  onSave: () => void;
  onCancel: () => void;
}

export default function AdminReviewForm({
  review,
  onSave,
  onCancel,
}: AdminReviewFormProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    company_name: '',
    rating: 5,
    review_text: '',
    project_type: '',
    project_description: '',
    video_url: '',
    image_url: '',
    is_featured: false,
    reference_id: null as string | null,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (review) {
      setFormData({
        customer_name: review.customer_name || '',
        company_name: review.company_name || '',
        rating: review.rating || 5,
        review_text: review.review_text || '',
        project_type: review.project_type || '',
        project_description: review.project_description || '',
        video_url: review.video_url || '',
        image_url: review.image_url || '',
        is_featured: review.is_featured || false,
        reference_id: review.reference_id || null,
      });
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const url = review ? `/api/reviews/${review.id}` : '/api/reviews';
      const method = review ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Fehler beim Speichern');
        return;
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setIsSaving(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setFormData((prev) => ({ ...prev, rating: i + 1 }))}
            className={`transition-colors ${
              i < rating
                ? 'text-yellow-400'
                : 'text-gray-600'
            }`}
          >
            <FiStar
              className={`w-6 h-6 ${
                i < rating ? 'fill-yellow-400' : ''
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Grundinformationen</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Kundenname *
          </label>
          <input
            type="text"
            value={formData.customer_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, customer_name: e.target.value }))}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Firmenname
          </label>
          <input
            type="text"
            value={formData.company_name}
            onChange={(e) => setFormData((prev) => ({ ...prev, company_name: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Bewertung *
          </label>
          {renderStars(formData.rating)}
          <p className="text-gray-400 text-sm mt-2">
            Aktuelle Bewertung: {formData.rating} von 5 Sternen
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Rezensionstext *
          </label>
          <textarea
            value={formData.review_text}
            onChange={(e) => setFormData((prev) => ({ ...prev, review_text: e.target.value }))}
            required
            rows={6}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Project Information */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Projektinformationen</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Projekttyp
          </label>
          <input
            type="text"
            value={formData.project_type}
            onChange={(e) => setFormData((prev) => ({ ...prev, project_type: e.target.value }))}
            placeholder="z.B. Immobilien, Events, etc."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Projektbeschreibung
          </label>
          <textarea
            value={formData.project_description}
            onChange={(e) => setFormData((prev) => ({ ...prev, project_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Media */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Medien</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Video URL (YouTube)
          </label>
          <input
            type="url"
            value={formData.video_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, video_url: e.target.value }))}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Bild URL
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
            placeholder="https://..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>
      </div>

      {/* Settings */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Einstellungen</h2>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_featured"
            checked={formData.is_featured}
            onChange={(e) => setFormData((prev) => ({ ...prev, is_featured: e.target.checked }))}
            className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-brand focus:ring-2 focus:ring-brand"
          />
          <label htmlFor="is_featured" className="text-white font-medium">
            Als Highlight markieren
          </label>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-blue-300 text-sm leading-relaxed">
            <strong>Info:</strong> Rezensionen mit aktivierter Highlight-Funktion werden auf der Landing Page angezeigt. 
            Diese Funktion ermöglicht es, besonders aussagekräftige Kundenstimmen prominent auf der Startseite zu platzieren.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave className="w-5 h-5" />
          {isSaving ? 'Wird gespeichert...' : review ? 'Aktualisieren' : 'Erstellen'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}

