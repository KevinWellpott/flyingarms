'use client';

import { Reference } from '@/types/reference';
import ReferenceCard from './ReferenceCard';

interface ReferencesGridProps {
  references: Reference[];
}

export default function ReferencesGrid({ references }: ReferencesGridProps) {
  console.log('📋 ReferencesGrid: Rendering', references.length, 'references');
  console.log('References data:', references.map(r => ({ id: r.id, title: r.title, slug: r.slug })));

  if (references.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">Keine Referenzen gefunden.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {references.map((reference, index) => {
        console.log(`Rendering reference ${index}:`, reference.id, reference.title);
        return (
          <ReferenceCard key={reference.id} reference={reference} />
        );
      })}
    </div>
  );
}

