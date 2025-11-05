import React from 'react';
import Spline from '@splinetool/react-spline';
import { ExternalLink } from 'lucide-react';

function Hero({ toolOfTheDay }) {
  return (
    <section className="relative h-[420px] sm:h-[520px]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient aura overlay - does not block interaction with Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-white/80 dark:from-zinc-950/80 dark:via-zinc-950/30 dark:to-zinc-950/90" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Discover the best AI tools for every workflow
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-300 max-w-prose">
              Explore, compare, and bookmark AI tools across writing, design, coding, marketing, education, and productivity — all in one place.
            </p>
          </div>

          {/* Tool of the Day */}
          {toolOfTheDay && (
            <div className="pointer-events-auto w-full sm:w-auto">
              <div className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 bg-white/70 dark:bg-zinc-900/70 backdrop-blur p-4 shadow-lg">
                <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Tool of the Day</span>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-white text-lg">
                    {toolOfTheDay.logo ?? '🤖'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">{toolOfTheDay.name}</div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">{toolOfTheDay.description}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <a href={toolOfTheDay.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                        Visit Website <ExternalLink size={14} />
                      </a>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300">{toolOfTheDay.pricing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
