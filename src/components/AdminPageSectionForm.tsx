'use client';

import { useState, useEffect } from 'react';
import { PageSection, PageSectionFormData, ServiceItem, PricingTier, GalleryImage, FeaturedVideo } from '@/types/page-section';
import { createPageSection, updatePageSection } from '@/lib/page-sections';
import { extractYouTubeId } from '@/lib/utils';
import FileUpload from './FileUpload';
import { FiPlus, FiX, FiSave } from 'react-icons/fi';

interface AdminPageSectionFormProps {
  pageSection?: PageSection;
  onSave: () => void;
  onCancel: () => void;
}

export default function AdminPageSectionForm({
  pageSection,
  onSave,
  onCancel,
}: AdminPageSectionFormProps) {
  const [formData, setFormData] = useState<PageSectionFormData>({
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    description_left: '',
    description_right: '',
    hero_video_url: '',
    hero_thumbnail: '',
    services: [],
    pricing_section_title: '',
    pricing_section_subtitle: '',
    pricing_section_description: '',
    pricing_tiers: [],
    gallery_section_title: '',
    gallery_section_subtitle: '',
    gallery_section_description: '',
    gallery_images: [],
    featured_video: undefined,
    meta_title: '',
    meta_description: '',
    is_active: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (pageSection) {
      // Parse JSON fields if they are strings
      const services = typeof pageSection.services === 'string' 
        ? JSON.parse(pageSection.services) 
        : pageSection.services || [];
      const pricingTiers = typeof pageSection.pricing_tiers === 'string'
        ? JSON.parse(pageSection.pricing_tiers)
        : pageSection.pricing_tiers || [];
      const galleryImages = typeof pageSection.gallery_images === 'string'
        ? JSON.parse(pageSection.gallery_images)
        : pageSection.gallery_images || [];
      const featuredVideo = typeof pageSection.featured_video === 'string'
        ? JSON.parse(pageSection.featured_video)
        : pageSection.featured_video;

      setFormData({
        slug: pageSection.slug,
        title: pageSection.title,
        subtitle: pageSection.subtitle || '',
        description: pageSection.description || '',
        description_left: pageSection.description_left || '',
        description_right: pageSection.description_right || '',
        hero_video_url: pageSection.hero_video_url || '',
        hero_thumbnail: pageSection.hero_thumbnail || '',
        services: services,
        pricing_section_title: pageSection.pricing_section_title || '',
        pricing_section_subtitle: pageSection.pricing_section_subtitle || '',
        pricing_section_description: pageSection.pricing_section_description || '',
        pricing_tiers: pricingTiers,
        gallery_section_title: pageSection.gallery_section_title || '',
        gallery_section_subtitle: pageSection.gallery_section_subtitle || '',
        gallery_section_description: pageSection.gallery_section_description || '',
        gallery_images: galleryImages,
        featured_video: featuredVideo,
        meta_title: pageSection.meta_title || '',
        meta_description: pageSection.meta_description || '',
        is_active: pageSection.is_active || false,
      });
    }
  }, [pageSection]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...(prev.services || []),
        {
          id: Date.now().toString(),
          icon_name: 'video',
          color: 'rgba(0,198,255,0.6)',
          order: (prev.services?.length || 0) + 1,
          title: '',
          description: '',
          details: '',
        },
      ],
    }));
  };

  const updateService = (index: number, field: keyof ServiceItem, value: any) => {
    setFormData((prev) => {
      const services = [...(prev.services || [])];
      services[index] = { ...services[index], [field]: value };
      return { ...prev, services };
    });
  };

  const removeService = (index: number) => {
    setFormData((prev) => {
      const services = [...(prev.services || [])];
      services.splice(index, 1);
      return { ...prev, services };
    });
  };

  const addPricingTier = () => {
    setFormData((prev) => ({
      ...prev,
      pricing_tiers: [
        ...(prev.pricing_tiers || []),
        {
          id: Date.now().toString(),
          name: '',
          tagline: '',
          icon: '📱',
          features: [],
          cta: '',
          highlight: false,
          order: (prev.pricing_tiers?.length || 0) + 1,
        },
      ],
    }));
  };

  const updatePricingTier = (index: number, field: keyof PricingTier, value: any) => {
    setFormData((prev) => {
      const tiers = [...(prev.pricing_tiers || [])];
      tiers[index] = { ...tiers[index], [field]: value };
      return { ...prev, pricing_tiers: tiers };
    });
  };

  const addPricingFeature = (tierIndex: number) => {
    setFormData((prev) => {
      const tiers = [...(prev.pricing_tiers || [])];
      tiers[tierIndex].features = [...(tiers[tierIndex].features || []), ''];
      return { ...prev, pricing_tiers: tiers };
    });
  };

  const updatePricingFeature = (tierIndex: number, featureIndex: number, value: string) => {
    setFormData((prev) => {
      const tiers = [...(prev.pricing_tiers || [])];
      tiers[tierIndex].features[featureIndex] = value;
      return { ...prev, pricing_tiers: tiers };
    });
  };

  const removePricingFeature = (tierIndex: number, featureIndex: number) => {
    setFormData((prev) => {
      const tiers = [...(prev.pricing_tiers || [])];
      tiers[tierIndex].features.splice(featureIndex, 1);
      return { ...prev, pricing_tiers: tiers };
    });
  };

  const removePricingTier = (index: number) => {
    setFormData((prev) => {
      const tiers = [...(prev.pricing_tiers || [])];
      tiers.splice(index, 1);
      return { ...prev, pricing_tiers: tiers };
    });
  };

  const addGalleryImage = () => {
    setFormData((prev) => ({
      ...prev,
      gallery_images: [
        ...(prev.gallery_images || []),
        {
          id: Date.now().toString(),
          title: '',
          description: '',
          image_url: '',
          category: '',
          size: 'medium',
          order: (prev.gallery_images?.length || 0) + 1,
        },
      ],
    }));
  };

  const updateGalleryImage = (index: number, field: keyof GalleryImage, value: any) => {
    setFormData((prev) => {
      const images = [...(prev.gallery_images || [])];
      images[index] = { ...images[index], [field]: value };
      return { ...prev, gallery_images: images };
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => {
      const images = [...(prev.gallery_images || [])];
      images.splice(index, 1);
      return { ...prev, gallery_images: images };
    });
  };

  const handleHeroThumbnailUpload = (url: string, path: string) => {
    setFormData((prev) => ({ ...prev, hero_thumbnail: path }));
  };

  const handleGalleryImageUpload = (index: number, url: string, path: string) => {
    updateGalleryImage(index, 'image_url', path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      // Extrahiere YouTube Video ID aus URL falls vorhanden
      let heroVideoUrl = formData.hero_video_url;
      if (heroVideoUrl && (heroVideoUrl.includes('youtube.com') || heroVideoUrl.includes('youtu.be'))) {
        const videoId = extractYouTubeId(heroVideoUrl);
        if (videoId) {
          heroVideoUrl = `https://www.youtube.com/watch?v=${videoId}`;
        }
      }

      const submitData: PageSectionFormData = {
        ...formData,
        hero_video_url: heroVideoUrl,
      };

      if (pageSection) {
        const result = await updatePageSection(pageSection.id, submitData);
        if (!result.success) {
          setError(result.error || 'Fehler beim Aktualisieren');
          return;
        }
      } else {
        const result = await createPageSection(submitData);
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
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Grundinformationen</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Titel *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Slug *</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Untertitel</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Beschreibung Links</label>
            <textarea
              value={formData.description_left}
              onChange={(e) => setFormData((prev) => ({ ...prev, description_left: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Beschreibung Rechts</label>
            <textarea
              value={formData.description_right}
              onChange={(e) => setFormData((prev) => ({ ...prev, description_right: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Hero Section</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">YouTube Video URL</label>
          <input
            type="url"
            value={formData.hero_video_url}
            onChange={(e) => setFormData((prev) => ({ ...prev, hero_video_url: e.target.value }))}
            placeholder="https://www.youtube.com/watch?v=..."
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Hero Thumbnail</label>
          <FileUpload
            bucket="gallery-images"
            label="Thumbnail hochladen"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            maxSize={10 * 1024 * 1024}
            onUploadComplete={handleHeroThumbnailUpload}
            existingFile={formData.hero_thumbnail}
            compress={true}
          />
        </div>
      </div>

      {/* Services */}
      <div className="glass p-6 rounded-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Services</h2>
          <button
            type="button"
            onClick={addService}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Service hinzufügen
          </button>
        </div>

        {formData.services?.map((service, index) => (
          <div key={service.id || index} className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Service {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeService(index)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-red-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Titel</label>
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => updateService(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Icon Name</label>
                <select
                  value={service.icon_name}
                  onChange={(e) => updateService(index, 'icon_name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="video">Video</option>
                  <option value="camera">Camera</option>
                  <option value="production">Production</option>
                  <option value="pilot">Pilot</option>
                  <option value="measurement">Measurement</option>
                  <option value="mapping">Mapping</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Farbe</label>
                <input
                  type="text"
                  value={service.color}
                  onChange={(e) => updateService(index, 'color', e.target.value)}
                  placeholder="rgba(0,198,255,0.6)"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Order</label>
                <input
                  type="number"
                  value={service.order}
                  onChange={(e) => updateService(index, 'order', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
              <textarea
                value={service.description}
                onChange={(e) => updateService(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Details</label>
              <input
                type="text"
                value={service.details || ''}
                onChange={(e) => updateService(index, 'details', e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Pricing Section</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Titel</label>
          <input
            type="text"
            value={formData.pricing_section_title}
            onChange={(e) => setFormData((prev) => ({ ...prev, pricing_section_title: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Untertitel</label>
          <input
            type="text"
            value={formData.pricing_section_subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, pricing_section_subtitle: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
          <textarea
            value={formData.pricing_section_description}
            onChange={(e) => setFormData((prev) => ({ ...prev, pricing_section_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Pricing Tiers</h3>
          <button
            type="button"
            onClick={addPricingTier}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Tier hinzufügen
          </button>
        </div>

        {formData.pricing_tiers?.map((tier, tierIndex) => (
          <div key={tier.id || tierIndex} className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Tier {tierIndex + 1}</h4>
              <button
                type="button"
                onClick={() => removePricingTier(tierIndex)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-red-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Name</label>
                <input
                  type="text"
                  value={tier.name}
                  onChange={(e) => updatePricingTier(tierIndex, 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Tagline</label>
                <input
                  type="text"
                  value={tier.tagline}
                  onChange={(e) => updatePricingTier(tierIndex, 'tagline', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Icon</label>
                <input
                  type="text"
                  value={tier.icon}
                  onChange={(e) => updatePricingTier(tierIndex, 'icon', e.target.value)}
                  placeholder="📱"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Badge</label>
                <input
                  type="text"
                  value={tier.badge || ''}
                  onChange={(e) => updatePricingTier(tierIndex, 'badge', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">CTA</label>
                <input
                  type="text"
                  value={tier.cta}
                  onChange={(e) => updatePricingTier(tierIndex, 'cta', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tier.highlight || false}
                    onChange={(e) => updatePricingTier(tierIndex, 'highlight', e.target.checked)}
                    className="w-4 h-4 text-brand bg-gray-700 border-gray-600 rounded focus:ring-brand"
                  />
                  <span className="text-white">Highlight</span>
                </label>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-white">Features</label>
                <button
                  type="button"
                  onClick={() => addPricingFeature(tierIndex)}
                  className="text-brand hover:text-brand/80 text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
              {tier.features?.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updatePricingFeature(tierIndex, featureIndex, e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                  />
                  <button
                    type="button"
                    onClick={() => removePricingFeature(tierIndex, featureIndex)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Section */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Gallery Section</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Titel</label>
          <input
            type="text"
            value={formData.gallery_section_title}
            onChange={(e) => setFormData((prev) => ({ ...prev, gallery_section_title: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Untertitel</label>
          <input
            type="text"
            value={formData.gallery_section_subtitle}
            onChange={(e) => setFormData((prev) => ({ ...prev, gallery_section_subtitle: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
          <textarea
            value={formData.gallery_section_description}
            onChange={(e) => setFormData((prev) => ({ ...prev, gallery_section_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Gallery Images</h3>
          <button
            type="button"
            onClick={addGalleryImage}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Bild hinzufügen
          </button>
        </div>

        {formData.gallery_images?.map((image, index) => (
          <div key={image.id || index} className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Bild {index + 1}</h4>
              <button
                type="button"
                onClick={() => removeGalleryImage(index)}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-red-400" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Bild hochladen</label>
              <FileUpload
                bucket="gallery-images"
                label="Bild hochladen"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                maxSize={10 * 1024 * 1024}
                onUploadComplete={(url, path) => handleGalleryImageUpload(index, url, path)}
                existingFile={image.image_url}
                compress={true}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Titel</label>
                <input
                  type="text"
                  value={image.title}
                  onChange={(e) => updateGalleryImage(index, 'title', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Kategorie</label>
                <input
                  type="text"
                  value={image.category}
                  onChange={(e) => updateGalleryImage(index, 'category', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Größe</label>
                <select
                  value={image.size}
                  onChange={(e) => updateGalleryImage(index, 'size', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="tall">Tall</option>
                  <option value="wide">Wide</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Order</label>
                <input
                  type="number"
                  value={image.order}
                  onChange={(e) => updateGalleryImage(index, 'order', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
              <textarea
                value={image.description}
                onChange={(e) => updateGalleryImage(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Featured Video */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Video</h2>

        {!formData.featured_video && (
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                featured_video: {
                  id: Date.now().toString(),
                  title: '',
                  description: '',
                  video_url: '',
                  thumbnail_url: '',
                  duration: '',
                  category: '',
                  specs: {
                    resolution: '',
                    fps: '',
                    format: '',
                  },
                },
              }));
            }}
            className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            Featured Video hinzufügen
          </button>
        )}

        {formData.featured_video && (
          <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Featured Video</h3>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, featured_video: undefined }))}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-red-400" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Titel</label>
              <input
                type="text"
                value={formData.featured_video.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured_video: { ...prev.featured_video!, title: e.target.value },
                  }))
                }
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">YouTube Video URL</label>
              <input
                type="url"
                value={formData.featured_video.video_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured_video: { ...prev.featured_video!, video_url: e.target.value },
                  }))
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Beschreibung</label>
              <textarea
                value={formData.featured_video.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured_video: { ...prev.featured_video!, description: e.target.value },
                  }))
                }
                rows={3}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Resolution</label>
                <input
                  type="text"
                  value={formData.featured_video.specs?.resolution || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured_video: {
                        ...prev.featured_video!,
                        specs: { ...prev.featured_video!.specs, resolution: e.target.value },
                      },
                    }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">FPS</label>
                <input
                  type="text"
                  value={formData.featured_video.specs?.fps || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured_video: {
                        ...prev.featured_video!,
                        specs: { ...prev.featured_video!.specs, fps: e.target.value },
                      },
                    }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Format</label>
                <input
                  type="text"
                  value={formData.featured_video.specs?.format || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured_video: {
                        ...prev.featured_video!,
                        specs: { ...prev.featured_video!.specs, format: e.target.value },
                      },
                    }))
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Meta Information */}
      <div className="glass p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Meta Information</h2>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Meta Title</label>
          <input
            type="text"
            value={formData.meta_title}
            onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">Meta Description</label>
          <textarea
            value={formData.meta_description}
            onChange={(e) => setFormData((prev) => ({ ...prev, meta_description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData((prev) => ({ ...prev, is_active: e.target.checked }))}
              className="w-4 h-4 text-brand bg-gray-800 border-gray-600 rounded focus:ring-brand"
            />
            <span className="text-white">Aktiv</span>
          </label>
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
          {isSaving ? 'Wird gespeichert...' : pageSection ? 'Aktualisieren' : 'Erstellen'}
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

