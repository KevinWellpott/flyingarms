'use client';

import { Reference } from '@/types/reference';

interface InfoBlockProps {
  reference: Reference;
}

export default function InfoBlock({ reference }: InfoBlockProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 md:p-10">
            {/* Stichpunkt-Listen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Inhalt */}
              {reference.content_points && reference.content_points.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-3"></span>
                    Inhalt
                  </h3>
                  <ul className="space-y-2">
                    {reference.content_points.map((point, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-brand mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Aufgaben */}
              {reference.task_points && reference.task_points.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-3"></span>
                    Aufgaben
                  </h3>
                  <ul className="space-y-2">
                    {reference.task_points.map((point, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-brand mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Kunde */}
              {reference.client_info && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-3"></span>
                    Kunde
                  </h3>
                  <p className="text-gray-300">{reference.client_info}</p>
                </div>
              )}

              {/* Equipment */}
              {reference.equipment_points && reference.equipment_points.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-3"></span>
                    Equipment
                  </h3>
                  <ul className="space-y-2">
                    {reference.equipment_points.map((point, index) => (
                      <li key={index} className="text-gray-300 flex items-start">
                        <span className="text-brand mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Beschreibungstext */}
            {reference.description_text && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {reference.description_text}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

