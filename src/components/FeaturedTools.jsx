import React from 'react';
import { Star } from 'lucide-react';

function FeaturedTools({ tools, onSelect }) {
  if (!tools?.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Featured Tools</h2>
        <span className="text-xs text-zinc-500">Trending picks & editor's choice</span>
      </div>
      <div className="mt-4 grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-4 overflow-x-auto pb-2">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t)}
            className="text-left rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-indigo-300/70 dark:hover:border-indigo-600/40 transition-colors p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white text-lg">
                {t.logo ?? '✨'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{t.name}</h3>
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                    <Star size={12} /> Featured
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{t.description}</p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-600 dark:text-zinc-400">
                  <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{t.category}</span>
                  <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{t.pricing}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default FeaturedTools;
