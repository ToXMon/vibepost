'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import SubscribeForm from '@/components/SubscribeForm';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   particles + cosmic gradients establish atmosphere
 *  120ms   title and value proposition fade up
 *  280ms   subscribe module enters
 *  420ms   CTA row appears
 *  520ms   product preview cards rise in with stagger
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  title: 0.12,
  subtitle: 0.2,
  form: 0.28,
  ctas: 0.42,
  preview: 0.52,
};

const PREVIEW = [
  { title: 'Explore Vibe Feed', stat: '12.4k readers', accent: 'from-cyan-500/40 to-purple-500/40' },
  { title: 'Compose + Publish to Chain', stat: 'IPFS + wallet-auth', accent: 'from-fuchsia-500/40 to-blue-500/40' },
  { title: 'Creator Profile + Vibe Score', stat: 'Premium mode enabled', accent: 'from-purple-500/40 to-indigo-500/40' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pt-24 pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.2),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(217,70,239,0.16),transparent_40%)]" />
      <ParticleBackground />

      <div className="pointer-events-none absolute -top-20 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="pt-4 lg:pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-600 px-2.5 py-1 text-xs font-semibold text-white">
              <Sparkles className="h-3 w-3" /> Hackathon Build
            </span>
            <span className="text-xs tracking-wide text-zinc-300">Decentralized Publishing Stack</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: TIMING.title }}
            className="mb-5 text-5xl font-semibold tracking-tight text-white md:text-7xl"
            style={{ letterSpacing: '-0.03em', lineHeight: '1.05' }}
          >
            VibePost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: TIMING.subtitle }}
            className="mb-4 text-xl font-medium text-purple-200 md:text-3xl"
          >
            Decentralized publishing for AI builders
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: TIMING.subtitle + 0.08 }}
            className="mb-8 max-w-xl text-lg leading-relaxed text-zinc-300"
          >
            Wallet sign-in, IPFS persistence, and Akash-ready deployment — a portable content stack built to publish fast and monetize cleanly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: TIMING.form }}
            className="mb-6 max-w-md"
          >
            <SubscribeForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: TIMING.ctas }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_35px_rgba(168,85,247,0.45)] transition-all hover:brightness-110"
            >
              Unlock Premium Builder Feed <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-white transition-all hover:bg-white/10"
            >
              Start Publishing in 60s
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: TIMING.preview }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0b1020]/95 to-[#090714]/95 p-5 shadow-[0_0_60px_rgba(109,40,217,0.35)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold tracking-[0.14em] text-purple-200">LIVE PRODUCT PREVIEW</p>
              <span className="rounded-full border border-cyan-400/40 bg-cyan-500/20 px-2.5 py-1 text-xs text-cyan-200">Vibe Score 89</span>
            </div>

            <div className="space-y-3">
              {PREVIEW.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: TIMING.preview + 0.05 * index, duration: 0.35 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className={`mb-3 h-16 rounded-xl bg-gradient-to-r ${item.accent}`} />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <span className="text-xs text-zinc-400">{item.stat}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
