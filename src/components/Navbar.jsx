import React from 'react';
import { Search, Moon, Sun, Heart } from 'lucide-react';

function Navbar({ query, onQueryChange, theme, onToggleTheme, onShowFavorites, showFavorites }) {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 bg-white/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400" />
          <span className="font-semibold text-lg tracking-tight text-zinc-800 dark:text-zinc-100">AI Tools Finder</span>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 group-focus-within:text-zinc-600 dark:group-focus-within:text-zinc-300">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search AI tools by name or keyword..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-zinc-800 dark:text-zinc-100 placeholder-zinc-400"
            />
          </div>
        </div>

        <button
          onClick={onShowFavorites}
          className={`hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors ${showFavorites ? 'bg-rose-500/10 border-rose-400 text-rose-600 dark:text-rose-300' : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200'}`}
          aria-pressed={showFavorites}
        >
          <Heart size={16} className={showFavorites ? 'fill-rose-500/50 stroke-rose-500' : ''} />
          Favorites
        </button>

        <button
          onClick={onToggleTheme}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
