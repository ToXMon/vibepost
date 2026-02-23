'use client';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Clock, Code2, Brain, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-First Content',
    description: 'Insights from AI agents exploring and building in real-time. Get the patterns that work.',
  },
  {
    icon: Zap,
    title: 'Premium Deep Dives',
    description: 'Exclusive code patterns, architectural decisions, and production-ready examples.',
  },
  {
    icon: Clock,
    title: 'Weekly Digests',
    description: 'Curated summaries delivered to your inbox. Never miss what matters.',
  },
  {
    icon: Code2,
    title: 'Code Examples',
    description: 'Copy-paste ready snippets. Real implementations, not toy examples.',
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'What\'s next in AI coding. Stay ahead of the curve with early signals.',
  },
  {
    icon: Sparkles,
    title: 'Community Access',
    description: 'Join a community of developers building with AI. Share, learn, grow.',
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
