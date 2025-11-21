'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllReferencesAdmin, deleteReference } from '@/lib/references';
import { Reference } from '@/types/reference';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { isAuthenticated } from '@/lib/auth';

export default function AdminReferencesPage() {
  const router = useRouter();
  const [references, setReferences] = useState<Reference[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadReferences();
  }, [router]);

  // Lade Referenzen neu, wenn die Seite fokussiert wird (z.B. nach dem Erstellen)
  useEffect(() => {
    const handleFocus = () => {
      loadReferences();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const loadReferences = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getAllReferencesAdmin();
      console.log('Admin Page: Setting references:', data.length);
      setReferences(data);
      if (data.length === 0) {
        console.warn('⚠️ No references loaded - check API response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Fehler beim Laden';
      console.error('Error loading references:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Referenz wirklich löschen?')) {
      return;
    }

    try {
      const result = await deleteReference(id);
      if (result.success) {
        loadReferences();
      } else {
        alert(result.error || 'Fehler beim Löschen');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Fehler beim Löschen');
    }
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

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Referenzen verwalten
            </h1>
            <p className="text-gray-400">
              Verwalten Sie alle Referenzen und deren Inhalte
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadReferences}
              className="flex items-center gap-2 px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Aktualisieren"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Aktualisieren
            </button>
            <Link
              href="/admin/referenzen/new"
              className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Neue Referenz
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* References Table */}
        {references.length === 0 ? (
          <div className="text-center py-20 glass rounded-lg">
            <p className="text-gray-400 text-lg mb-4">Keine Referenzen gefunden.</p>
            <Link
              href="/admin/referenzen/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand/80 transition-colors"
            >
              <FiPlus className="w-5 h-5" />
              Erste Referenz erstellen
            </Link>
          </div>
        ) : (
          <div className="glass rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Titel
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Slug
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                      Sortierung
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-white">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {references.map((reference, index) => {
                    // Debug: Logge jede Referenz
                    if (index === 0) {
                      console.log('📋 Rendering references:', references.length);
                      console.log('References data:', references.map(r => ({ id: r.id, title: r.title })));
                    }
                    return (
                    <tr key={`ref-${reference.id}-${index}`} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-white font-medium">{reference.title}</div>
                        {reference.subtitle && (
                          <div className="text-gray-400 text-sm">{reference.subtitle}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-gray-400 text-sm">{reference.slug}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {reference.is_published ? (
                            <>
                              <FiEye className="w-4 h-4 text-green-400" />
                              <span className="text-green-400 text-sm">Veröffentlicht</span>
                            </>
                          ) : (
                            <>
                              <FiEyeOff className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-400 text-sm">Entwurf</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300">{reference.order_index || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/referenzen/${reference.slug}`}
                            target="_blank"
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label="Vorschau"
                          >
                            <FiEye className="w-5 h-5 text-gray-400" />
                          </Link>
                          <Link
                            href={`/admin/referenzen/edit/${reference.id}`}
                            className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                            aria-label="Bearbeiten"
                          >
                            <FiEdit className="w-5 h-5 text-blue-400" />
                          </Link>
                          <button
                            onClick={() => handleDelete(reference.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                            aria-label="Löschen"
                          >
                            <FiTrash2 className="w-5 h-5 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

