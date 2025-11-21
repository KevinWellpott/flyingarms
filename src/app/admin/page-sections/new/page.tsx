'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPageSectionForm from '@/components/AdminPageSectionForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function NewPageSectionPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSave = () => {
    router.push('/admin/page-sections');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/admin/page-sections');
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Neue Seite erstellen
        </h1>
        <AdminPageSectionForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
}

