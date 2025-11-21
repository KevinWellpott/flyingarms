'use client';

import { useState, useEffect } from 'react';
import { Reference, ReferenceFormData } from '@/types/reference';
import { createReference, updateReference, generateSlug } from '@/lib/references';
import { deleteFile } from '@/lib/storage';
import FileUpload from './FileUpload';
import ColorPicker from './ColorPicker';
import ReferenceReviewsAssignment from './ReferenceReviewsAssignment';
import { FiPlus, FiX, FiSave } from 'react-icons/fi';

interface AdminReferenceFormProps {
  reference?: Reference;
  onSave: () => void;
  onCancel: () => void;
}

export default function AdminReferenceForm({
  reference,
  onSave,
  onCancel,
}: AdminReferenceFormProps) {
  const [formData, setFormData] = useState<ReferenceFormData>({
    title: '',
    subtitle: '',
    slug: '',
    logo_path: '',
    highlight_video_path: '',
    youtube_video_id: '',
    color_glow: '#76E4F7',
    content_points: [],
    task_points: [],
    client_info: '',
    equipment_points: [],
    challenges: [],
    description_text: '',
    gallery_images: [],
    order_index: 0,
    is_published: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (reference) {
      setFormData({
        title: reference.title,
        subtitle: reference.subtitle || '',
        slug: reference.slug,
        logo_path: reference.logo_path || '',
        highlight_video_path: reference.highlight_video_path || '',
        youtube_video_id: reference.youtube_video_id || '',
        color_glow: reference.color_glow || '#76E4F7',
        content_points: reference.content_points || [],
        task_points: reference.task_points || [],
        client_info: reference.client_info || '',
        equipment_points: reference.equipment_points || [],
        challenges: reference.challenges || [],
        description_text: reference.description_text || '',
        gallery_images: reference.gallery_images || [],
        order_index: reference.order_index || 0,
        is_published: reference.is_published || false,
      });
    }
  }, [reference]);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const addPoint = (field: 'content_points' | 'task_points' | 'equipment_points' | 'challenges') => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), ''],
    }));
  };

  const updatePoint = (
    field: 'content_points' | 'task_points' | 'equipment_points' | 'challenges',
    index: number,
    value: string
  ) => {
    setFormData((prev) => {
      const points = [...(prev[field] || [])];
      points[index] = value;
      return {
        ...prev,
        [field]: points,
      };
    });
  };

  const removePoint = (
    field: 'content_points' | 'task_points' | 'equipment_points' | 'challenges',
    index: number
  ) => {
    setFormData((prev) => {
      const points = [...(prev[field] || [])];
      points.splice(index, 1);
      return {
        ...prev,
        [field]: points,
      };
    });
  };

  const handleLogoUpload = (url: string, path: string) => {
    setFormData((prev) => ({
      ...prev,
      logo_path: path,
    }));
  };

  const handleVideoUpload = (url: string, path: string) => {
    setFormData((prev) => ({
      ...prev,
      highlight_video_path: path,
    }));
  };

  const handleGalleryImageUpload = (url: string, path: string) => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: [...(prev.gallery_images || []), path],
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => {
      const images = [...(prev.gallery_images || [])];
      images.splice(index, 1);
      return {
        ...prev,
        gallery_images: images,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      if (reference) {
        // Update
        const result = await updateReference(reference.id, formData);
        if (!result.success) {
          setError(result.error || 'Fehler beim Aktualisieren');
          return;
        }
      } else {
        // Create
        const result = await createReference(formData);
        if (!result.success) {
          setError(result.error || 'Fehler beim Erstellen');
          return;
        }
      }

      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Grundinformationen</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Titel *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Untertitel
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            YouTube Video ID oder URL
          </label>
          <input
            type="text"
            value={formData.youtube_video_id}
            onChange={(e) => {
              const value = e.target.value;
              // Extrahiere Video-ID wenn eine URL eingegeben wurde
              let videoId = value;
              if (value.includes('youtube.com') || value.includes('youtu.be')) {
                const match = value.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                if (match && match[1]) {
                  videoId = match[1];
                }
              }
              setFormData((prev) => ({ ...prev, youtube_video_id: videoId }));
            }}
            placeholder="z.B. dQw4w9WgXcQ oder https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
          <p className="text-xs text-gray-400 mt-1">
            Sie können entweder die Video-ID (11 Zeichen) oder eine vollständige YouTube-URL eingeben
          </p>
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData((prev) => ({ ...prev, is_published: e.target.checked }))}
              className="w-4 h-4 text-brand bg-gray-800 border-gray-600 rounded focus:ring-brand"
            />
            <span className="text-white">Veröffentlicht</span>
          </label>
        </div>
      </div>

      {/* Files */}
      <div className="glass p-6 rounded-lg space-y-6">
        <h2 className="text-2xl font-bold text-white mb-4">Dateien</h2>

        <FileUpload
          bucket="logos"
          label="Logo"
          accept="image/png,image/svg+xml,image/jpeg,image/jpg"
          maxSize={5 * 1024 * 1024}
          onUploadComplete={handleLogoUpload}
          existingFile={formData.logo_path}
        />

        <FileUpload
          bucket="videos"
          label="Highlight Video"
          accept="video/mp4,video/webm"
          maxSize={50 * 1024 * 1024}
          onUploadComplete={handleVideoUpload}
          existingFile={formData.highlight_video_path}
        />

        <FileUpload
          bucket="gallery-images"
          label="Galerie Bilder"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          maxSize={10 * 1024 * 1024}
          onUploadComplete={handleGalleryImageUpload}
          multiple
          compress
        />

        {/* Gallery Images List */}
        {formData.gallery_images && formData.gallery_images.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Hochgeladene Bilder:
            </label>
            <div className="space-y-2">
              {formData.gallery_images.map((path, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between glass p-3 rounded-lg"
                >
                  <span className="text-white text-sm truncate flex-1">{path}</span>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="ml-4 p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <FiX className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Color Glow */}
      <div className="glass p-6 rounded-lg">
        <ColorPicker
          value={formData.color_glow}
          onChange={(color) => setFormData((prev) => ({ ...prev, color_glow: color }))}
        />
      </div>

      {/* Content Points */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Inhalt</h2>
          <button
            type="button"
            onClick={() => addPoint('content_points')}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Hinzufügen
          </button>
        </div>
        {formData.content_points?.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={point}
              onChange={(e) => updatePoint('content_points', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => removePoint('content_points', index)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Task Points */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Aufgaben</h2>
          <button
            type="button"
            onClick={() => addPoint('task_points')}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Hinzufügen
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          💡 Tipp: Sie können mehrere Einträge durch Komma trennen (z.B. "Aufgabe 1, Aufgabe 2, Aufgabe 3")
        </p>
        {formData.task_points?.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={point}
              placeholder="Aufgabe eingeben (kommagetrennt möglich)"
              onChange={(e) => updatePoint('task_points', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => removePoint('task_points', index)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Client Info */}
      <div className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Kunde</h2>
        <p className="text-gray-400 text-sm mb-4">
          💡 Tipp: Sie können mehrere Einträge durch Komma trennen (z.B. "Kunde 1, Kunde 2, Kunde 3")
        </p>
        <textarea
          value={formData.client_info}
          onChange={(e) => setFormData((prev) => ({ ...prev, client_info: e.target.value }))}
          placeholder="Kundeninformationen eingeben (kommagetrennt möglich)"
          rows={3}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Equipment Points */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Equipment</h2>
          <button
            type="button"
            onClick={() => addPoint('equipment_points')}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Hinzufügen
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          💡 Tipp: Sie können mehrere Einträge durch Komma trennen (z.B. "Equipment 1, Equipment 2, Equipment 3")
        </p>
        {formData.equipment_points?.map((point, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={point}
              placeholder="Equipment eingeben (kommagetrennt möglich)"
              onChange={(e) => updatePoint('equipment_points', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => removePoint('equipment_points', index)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Challenges */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Herausforderungen</h2>
          <button
            type="button"
            onClick={() => addPoint('challenges')}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Hinzufügen
          </button>
        </div>
        <p className="text-gray-400 text-sm">
          💡 Tipp: Sie können mehrere Einträge durch Komma trennen (z.B. "Herausforderung 1, Herausforderung 2, Herausforderung 3")
        </p>
        {formData.challenges?.map((challenge, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={challenge}
              placeholder="Herausforderung eingeben (kommagetrennt möglich)"
              onChange={(e) => updatePoint('challenges', index, e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
            <button
              type="button"
              onClick={() => removePoint('challenges', index)}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">Beschreibung</h2>
        <textarea
          value={formData.description_text}
          onChange={(e) => setFormData((prev) => ({ ...prev, description_text: e.target.value }))}
          rows={6}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Reviews Assignment */}
      {reference && (
        <ReferenceReviewsAssignment referenceId={reference.id} />
      )}

      {/* Order Index */}
      <div className="glass p-6 rounded-lg">
        <label className="block text-sm font-medium text-white mb-2">
          Sortierreihenfolge
        </label>
        <input
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData((prev) => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiSave className="w-5 h-5" />
          {isSaving ? 'Wird gespeichert...' : reference ? 'Aktualisieren' : 'Erstellen'}
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

