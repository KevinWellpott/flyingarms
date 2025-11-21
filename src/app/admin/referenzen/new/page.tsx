'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminReferenceForm from '@/components/AdminReferenceForm';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function NewReferencePage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleSave = () => {
    router.push('/admin/referenzen');
    // Force reload nach Navigation
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleCancel = () => {
    router.push('/admin/referenzen');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          Neue Referenz erstellen
        </h1>
        <AdminReferenceForm onSave={handleSave} onCancel={handleCancel} />
      </div>
    </AdminLayout>
  );
}

