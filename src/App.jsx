import React, { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeaturedTools from './components/FeaturedTools.jsx';
import ToolGrid from './components/ToolGrid.jsx';
import { X, ExternalLink, Heart } from 'lucide-react';

const initialTools = [
  {
    id: 'notion-ai',
    name: 'Notion AI',
    logo: '🧠',
    category: 'Productivity',
    description: 'Write faster, summarize notes, and brainstorm inside your workspace.',
    features: ['Summarization', 'Idea generation', 'Auto-complete'],
    pricing: 'Paid',
    website: 'https://www.notion.so/product/ai',
    tags: ['notes', 'writing', 'assistant'],
    featured: true,
    trending: true,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    logo: '🎨',
    category: 'Image Generation',
    description: 'Create stunning images from text prompts with advanced diffusion models.',
    features: ['Text-to-image', 'Styles & prompts', 'Community'],
    pricing: 'Paid',
    website: 'https://www.midjourney.com',
    tags: ['art', 'design', 'images'],
    featured: true,
    trending: true,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: '💬',
    category: 'Chatbots',
    description: 'Conversational AI for assistance, content, coding, and more.',
    features: ['Conversation', 'Plugins', 'Code help'],
    pricing: 'Free',
    website: 'https://chat.openai.com',
    tags: ['assistant', 'writing', 'coding'],
    featured: true,
    trending: true,
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    logo: '🔎',
    category: 'Education',
    description: 'Ask anything and get cited answers powered by AI search.',
    features: ['Search', 'Citations', 'Focus mode'],
    pricing: 'Free',
    website: 'https://www.perplexity.ai',
    tags: ['search', 'research', 'study'],
    featured: false,
    trending: true,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    logo: '🧑‍💻',
    category: 'Coding',
    description: 'An AI-first code editor that helps you write and refactor code faster.',
    features: ['Code generation', 'Refactor', 'Chat'],
    pricing: 'Free',
    website: 'https://www.cursor.com',
    tags: ['developer', 'editor', 'programming'],
    featured: true,
    trending: true,
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    logo: '✨',
    category: 'Design',
    description: 'Magic tools to generate images, videos, and content for your designs.',
    features: ['Magic Design', 'AI image', 'Video'],
    pricing: 'Paid',
    website: 'https://www.canva.com/magic-studio/',
    tags: ['design', 'images', 'video'],
    featured: false,
    trending: true,
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    logo: '✍️',
    category: 'Writing',
    description: 'AI writing assistant for clear, effective communication.',
    features: ['Grammar', 'Style', 'Rewrite'],
    pricing: 'Free',
    website: 'https://www.grammarly.com',
    tags: ['writing', 'editor', 'productivity'],
    featured: false,
    trending: false,
  },
  {
    id: 'jasper',
    name: 'Jasper',
    logo: '🚀',
    category: 'Marketing',
    description: 'AI content platform for teams to create on-brand copy quickly.',
    features: ['Brand voice', 'Templates', 'Campaigns'],
    pricing: 'Paid',
    website: 'https://www.jasper.ai',
    tags: ['copywriting', 'ads', 'social'],
    featured: false,
    trending: true,
  },
];

function App() {
  const [tools, setTools] = useState(initialTools);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState(() => new Set(JSON.parse(localStorage.getItem('favorites') || '[]')));
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const featured = useMemo(() => tools.filter((t) => t.featured), [tools]);

  const toolOfTheDay = useMemo(() => {
    if (!featured.length) return null;
    const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
    return featured[day % featured.length];
  }, [featured]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSuggest = (payload) => {
    const id = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newTool = {
      id,
      name: payload.name,
      logo: '🆕',
      category: payload.category || 'Misc',
      description: payload.description || 'User suggested tool',
      features: [],
      pricing: 'Free',
      website: payload.website,
      tags: [],
      featured: false,
      trending: false,
    };
    setTools((prev) => [newTool, ...prev]);
  };

  const recommendations = useMemo(() => {
    if (!selectedTool) return [];
    return tools.filter((t) => t.id !== selectedTool.id && (t.category === selectedTool.category || t.tags?.some((tag) => selectedTool.tags?.includes(tag)))).slice(0, 6);
  }, [selectedTool, tools]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar
        query={query}
        onQueryChange={setQuery}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        onShowFavorites={() => setShowFavorites((v) => !v)}
        showFavorites={showFavorites}
      />

      <Hero toolOfTheDay={toolOfTheDay} />

      <FeaturedTools tools={featured} onSelect={setSelectedTool} />

      <ToolGrid
        tools={tools}
        query={query}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
        onSelect={setSelectedTool}
        showFavorites={showFavorites}
        onSuggest={handleSuggest}
      />

      {/* Tool Details Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedTool(null)} />
          <div className="relative z-10 w-full sm:w-[560px] max-h-[80vh] overflow-auto rounded-t-2xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white text-xl">
                {selectedTool.logo ?? '🤖'}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">{selectedTool.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{selectedTool.category}</span>
                  <span className="px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700">{selectedTool.pricing}</span>
                </div>
              </div>
              <button onClick={() => setSelectedTool(null)} className="rounded-lg p-2 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">{selectedTool.description}</p>

            {selectedTool.features?.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">Key features</div>
                <ul className="list-disc pl-5 text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                  {selectedTool.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5 flex items-center justify-between">
              <a href={selectedTool.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
                Visit Website <ExternalLink size={16} />
              </a>
              <button
                onClick={() => setFavorites((prev) => { const n = new Set(prev); n.has(selectedTool.id) ? n.delete(selectedTool.id) : n.add(selectedTool.id); return n; })}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${favorites.has(selectedTool.id) ? 'border-rose-300/60 bg-rose-500/10 text-rose-600 dark:text-rose-300' : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'}`}
              >
                <Heart size={16} className={favorites.has(selectedTool.id) ? 'fill-rose-500/50 stroke-rose-500' : ''} />
                {favorites.has(selectedTool.id) ? 'Saved' : 'Save'}
              </button>
            </div>

            {recommendations.length > 0 && (
              <div className="mt-6">
                <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Similar tools</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {recommendations.map((t) => (
                    <button key={t.id} onClick={() => setSelectedTool(t)} className="text-left rounded-lg p-3 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300/70 dark:hover:border-indigo-600/40">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white text-sm">{t.logo ?? '🤖'}</div>
                        <div>
                          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.name}</div>
                          <div className="text-[11px] text-zinc-500">{t.category} • {t.pricing}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="mt-12 pb-10 text-center text-xs text-zinc-500">
        Built with ❤️ for exploring AI tools.
      </footer>
    </div>
  );
}

export default App;
