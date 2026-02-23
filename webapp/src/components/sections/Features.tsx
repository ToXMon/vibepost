'use client';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Coins, Brain, Rocket } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Wallet-Native Identity',
    description: 'SIWE auth keeps creators sovereign and removes OAuth lock-in from day one.',
    metric: 'Zero OAuth dependency',
  },
  {
    icon: Sparkles,
    title: 'IPFS-backed Publishing',
    description: 'Every post can be pinned and resolved by CID for verifiable content provenance.',
    metric: 'Content portability',
  },
  {
    icon: Rocket,
    title: 'Akash Deployment Path',
    description: 'Ship to decentralized cloud with reproducible containers and no Vercel reliance.',
    metric: 'Docker + SDL ready',
  },
  {
    icon: Brain,
    title: 'Creator Workflow',
    description: 'Compose, preview, and publish with productized flow designed for fast shipping.',
    metric: '60s publish loop',
  },
  {
    icon: Coins,
    title: 'Monetization Rails',
    description: 'Start with Stripe and layer in crypto-native billing as audience behavior evolves.',
    metric: 'Free + premium plans',
  },
  {
    icon: Zap,
    title: 'Demo-Day Polish',
    description: 'Neon-cosmic visual language with intentional motion built for immediate impact.',
    metric: 'Judge-first UX',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Built for first-place demos</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Real SaaS architecture, decentralized primitives, and a visual identity that feels like an actual product category.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 transition-all hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_35px_rgba(56,189,248,0.2)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-600/20">
                <feature.icon className="h-6 w-6 text-purple-200" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mb-4 text-zinc-400">{feature.description}</p>
              <p className="text-xs font-medium tracking-[0.12em] text-cyan-300">{feature.metric}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
