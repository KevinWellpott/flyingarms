'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminReviewForm from '@/components/AdminReviewForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function NewReviewPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSave = () => {
    router.push('/admin/rezensionen');
  };

  const handleCancel = () => {
    router.push('/admin/rezensionen');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Neue Rezension erstellen
        </h1>
        <AdminReviewForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
}

