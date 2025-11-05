import React, { useMemo, useState } from 'react';
import { Heart, ExternalLink, PlusCircle } from 'lucide-react';

function CategoryChips({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('All')}
        className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${selected === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${selected === c ? 'bg-indigo-600 text-white border-indigo-600' : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function ToolCard({ tool, isFavorite, onToggleFavorite, onSelect }) {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-indigo-300/70 dark:hover:border-indigo-600/40 transition-colors">
      <div className="flex items-start gap-3">
        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white text-xl">
          {tool.logo ?? '🤖'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <button onClick={() => onSelect(tool)} className="text-left">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">{tool.name}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{tool.description}</p>
            </button>
            <button
              onClick={() => onToggleFavorite(tool.id)}
              className={`shrink-0 rounded-lg p-2 border transition-colors ${isFavorite ? 'border-rose-300/60 bg-rose-500/10 text-rose-600 dark:text-rose-300' : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
              aria-pressed={isFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart size={16} className={isFavorite ? 'fill-rose-500/50 stroke-rose-500' : ''} />
            </button>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] text-zinc-600 dark:text-zinc-400">
            <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{tool.category}</span>
            <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{tool.pricing}</span>
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
          {tool.features?.slice(0, 3).join(' • ')}
        </div>
        <a href={tool.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
          Visit <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}

function SuggestTool({ onSuggest }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', website: '', category: '', description: '' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.website) return;
    onSuggest(form);
    setForm({ name: '', website: '', category: '', description: '' });
    setOpen(false);
  };

  return (
    <div className="mt-6">
      {!open ? (
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400">
          <PlusCircle size={18} /> Suggest a new tool
        </button>
      ) : (
        <form onSubmit={submit} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 grid sm:grid-cols-2 gap-3">
          <input
            className="w-full px-3 py-2 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tool name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Website URL"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Category (e.g., Writing)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <input
            className="w-full px-3 py-2 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Short description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="sm:col-span-2 flex items-center gap-3">
            <button type="submit" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">Submit</button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-zinc-600 dark:text-zinc-300">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}

function ToolGrid({ tools, query, selectedCategory, onSelectCategory, favorites, onToggleFavorite, onSelect, showFavorites, onSuggest }) {
  const categories = useMemo(() => Array.from(new Set(tools.map((t) => t.category))).sort(), [tools]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((t) => {
      const inFavorites = !showFavorites || favorites.has(t.id);
      const inCategory = selectedCategory === 'All' || t.category === selectedCategory;
      const inQuery = !q || [t.name, t.description, ...(t.tags || [])].some((v) => v?.toLowerCase().includes(q));
      return inFavorites && inCategory && inQuery;
    });
  }, [tools, query, selectedCategory, favorites, showFavorites]);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
      <div className="flex items-center justify-between gap-4">
        <CategoryChips categories={categories} selected={selectedCategory} onSelect={onSelectCategory} />
        <div className="text-xs text-zinc-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <ToolCard
            key={t.id}
            tool={t}
            isFavorite={favorites.has(t.id)}
            onToggleFavorite={onToggleFavorite}
            onSelect={onSelect}
          />
        ))}
      </div>

      <SuggestTool onSuggest={onSuggest} />
    </section>
  );
}

export default ToolGrid;
