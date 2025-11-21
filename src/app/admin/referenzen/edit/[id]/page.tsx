'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Reference } from '@/types/reference';
import AdminReferenceForm from '@/components/AdminReferenceForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function EditReferencePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [reference, setReference] = useState<Reference | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadReference();
  }, [id, router]);

  const loadReference = async () => {
    try {
      const response = await fetch(`/api/references/${id}`);
      
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Fehler beim Laden');
        return;
      }

      const data = await response.json();
      setReference(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    router.push('/admin/referenzen');
  };

  const handleCancel = () => {
    router.push('/admin/referenzen');
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

  if (error || !reference) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-red-400">{error || 'Referenz nicht gefunden'}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Referenz bearbeiten
        </h1>
        <AdminReferenceForm
          reference={reference}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </AdminLayout>
  );
}

