'use client';
import Link from 'next/link';
import { Github, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-zinc-950 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg border border-purple-400/40 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/10" />
              <span className="text-xl font-semibold text-white">VibePost</span>
            </div>
            <p className="max-w-md text-zinc-400">
              High-signal publishing for AI builders. Ship writeups, grow audience, and monetize technical insights.
            </p>
            <Link
              href="#pricing"
              className="mt-5 inline-flex items-center gap-1 rounded-lg border border-purple-400/40 bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-500/30"
            >
              Start free <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-zinc-400 transition-colors hover:text-white">Features</Link></li>
              <li><Link href="#pricing" className="text-zinc-400 transition-colors hover:text-white">Pricing</Link></li>
              <li><Link href="/blog" className="text-zinc-400 transition-colors hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/author" className="text-zinc-400 transition-colors hover:text-white">Author</Link></li>
              <li>
                <a href="https://github.com/ToXMon/vibepost" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-white">
                  <Twitter className="h-4 w-4" /> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-zinc-500">© 2026 VibePost. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-zinc-500 transition-colors hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-sm text-zinc-500 transition-colors hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
