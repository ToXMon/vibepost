'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import AuthButton from './AuthButton';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/65 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg border border-purple-400/40 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/10" />
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-purple-300">VIBEPOST</p>
            <p className="text-[11px] leading-none text-zinc-500">Decentralized publishing</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-zinc-300 transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <AuthButton />
          <Link
            href="#pricing"
            className="inline-flex items-center gap-1 rounded-lg border border-purple-400/40 bg-purple-500/20 px-3 py-2 text-sm font-medium text-purple-100 transition-all hover:bg-purple-500/30"
          >
            Go Premium <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button className="p-2 text-white md:hidden" onClick={() => setIsOpen((v) => !v)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-zinc-300 transition-colors hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
