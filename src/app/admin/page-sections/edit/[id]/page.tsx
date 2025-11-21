'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { PageSection } from '@/types/page-section';
import AdminPageSectionForm from '@/components/AdminPageSectionForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function EditPageSectionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [pageSection, setPageSection] = useState<PageSection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadPageSection();
  }, [id, router]);

  const loadPageSection = async () => {
    try {
      const response = await fetch(`/api/page-sections/${id}`);
      
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Fehler beim Laden');
        return;
      }

      const data = await response.json();
      setPageSection(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    router.push('/admin/page-sections');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/page-sections');
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

  if (error || !pageSection) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-red-400">{error || 'Seite nicht gefunden'}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Seite bearbeiten
        </h1>
        <AdminPageSectionForm pageSection={pageSection} onSave={handleSave} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
}

