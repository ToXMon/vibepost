'use client';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import SubscribeForm from '@/components/SubscribeForm';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   ambient particles + orbit layers are visible
 *  120ms   hero title fades/slides in
 *  200ms   subtitle stack fades in
 *  320ms   subscribe form enters
 *  420ms   CTA row appears
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  title: 0.12,
  subtitle: 0.2,
  form: 0.32,
  ctas: 0.42,
};

const ORBITS = {
  outer: {
    duration: 25,
    size: "w-[900px] h-[900px]",
    border: "border-purple-500/20",
  },
  inner: {
    duration: 35,
    size: "w-[650px] h-[650px]",
    border: "border-purple-500/30",
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.2),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.14),transparent_35%)]" />
      
      <ParticleBackground />

      {/* Background Layer 2: The Swirling Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-[800px] h-[600px] bg-purple-600 opacity-[0.25] blur-[120px] rounded-[100%] rotate-[-25deg] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[55%] w-[700px] h-[500px] bg-black opacity-[0.9] blur-[80px] rounded-[100%] rotate-[-25deg] pointer-events-none" />

      {/* Background Layer 3: 3D Animated Orbits */}
      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotateX(75deg) rotateY(-15deg)', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ rotateZ: 360 }}
          transition={{ duration: ORBITS.outer.duration, repeat: Infinity, ease: "linear" }}
          className={`${ORBITS.outer.size} rounded-full border ${ORBITS.outer.border} relative`}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_20px_4px_rgba(168,85,247,0.8)]" />
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'translate(-50%, -50%) rotateX(70deg) rotateY(10deg)', transformStyle: 'preserve-3d' }}>
        <motion.div
          animate={{ rotateZ: -360 }}
          transition={{ duration: ORBITS.inner.duration, repeat: Infinity, ease: "linear" }}
          className={`${ORBITS.inner.size} rounded-full border ${ORBITS.inner.border} relative`}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[1100px] mx-auto mt-10">
        
        {/* Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 p-1 pr-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
        >
          <span className="px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> AI-Native
          </span>
          <span className="text-sm text-gray-300 font-medium tracking-wide">Newsletter Platform</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: TIMING.title }}
          className="text-5xl md:text-[84px] font-semibold text-white tracking-tight mb-6 max-w-[1000px]"
          style={{ letterSpacing: '-2.8px', lineHeight: '1.05' }}
        >
          VibePost
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: TIMING.subtitle }}
          className="text-lg md:text-[28px] text-purple-300 mb-4 font-medium"
        >
          Decentralized publishing for AI builders
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: TIMING.subtitle + 0.08 }}
          className="text-lg md:text-[21px] text-zinc-400 mb-10 max-w-2xl font-normal leading-relaxed"
        >
          Wallet sign-in, IPFS content persistence, and Akash-ready deployment — so your content stack is portable, censorship-resistant, and production fast.
        </motion.p>

        {/* Subscribe Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: TIMING.form }}
          className="w-full max-w-md mb-8"
        >
          <SubscribeForm />
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: TIMING.ctas }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#pricing"
            className="flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-700 transition-all text-white font-medium rounded-lg shadow-[0_4px_40px_rgba(168,85,247,0.4)] hover:shadow-[0_4px_50px_rgba(168,85,247,0.6)]"
          >
            Get Premium <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
          <a
            href="#features"
            className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/10 transition-all text-white font-medium rounded-lg"
          >
            View Features
          </a>
        </motion.div>
      </div>
    </section>
  );
}
