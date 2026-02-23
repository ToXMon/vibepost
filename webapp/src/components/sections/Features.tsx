'use client';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Clock, Code2, Brain, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Wallet-Native Auth',
    description: 'SIWE-based authentication removes OAuth lock-in and gives creators direct wallet identity.',
  },
  {
    icon: Zap,
    title: 'IPFS Content Layer',
    description: 'Posts are pinned to IPFS for portable publishing and verifiable content provenance.',
  },
  {
    icon: Clock,
    title: 'Akash Deployment Ready',
    description: 'Run production workloads on decentralized cloud capacity instead of centralized hosting defaults.',
  },
  {
    icon: Code2,
    title: 'Developer-First APIs',
    description: 'Simple endpoints and markdown-first authoring so teams can ship hacks into products quickly.',
  },
  {
    icon: TrendingUp,
    title: 'Onchain-Adjacent Monetization',
    description: 'Keep Stripe if needed today, add crypto rails as your audience shifts to wallet-native users.',
  },
  {
    icon: Sparkles,
    title: 'High-Polish Motion UX',
    description: 'Framer-motion storytelling and layered visual rhythm built for demo-day impact.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for the AI Coding Era
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Everything you need to stay ahead in the rapidly evolving world of AI-assisted development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
