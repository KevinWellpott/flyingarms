'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Review } from '@/lib/supabase-reviews';
import AdminReviewForm from '@/components/AdminReviewForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function EditReviewPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadReview();
  }, [id, router]);

  const loadReview = async () => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      
      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Fehler beim Laden');
        return;
      }

      const data = await response.json();
      setReview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fehler beim Laden');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    router.push('/admin/rezensionen');
  };

  const handleCancel = () => {
    router.push('/admin/rezensionen');
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

  if (error || !review) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-red-400">{error || 'Rezension nicht gefunden'}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Rezension bearbeiten
        </h1>
        <AdminReviewForm review={review} onSave={handleSave} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
}

