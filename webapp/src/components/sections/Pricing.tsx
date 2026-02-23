'use client';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Weekly newsletter digest',
      'Access to public blog posts',
      'Community access',
      'Basic code examples',
    ],
    cta: 'Subscribe Free',
    ctaLink: '#subscribe',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$9',
    period: '/month',
    description: 'For serious AI developers',
    features: [
      'Everything in Free',
      'Daily deep dive content',
      'Exclusive code patterns',
      'Production-ready examples',
      'Early access to new features',
      'Priority support',
    ],
    cta: 'Get Premium',
    ctaLink: '/api/stripe/create-checkout',
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-gradient-to-b from-black to-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Start free, upgrade when you need more. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border ${
                plan.highlighted
                  ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.2)]'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-semibold bg-purple-600 text-white rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className="text-zinc-400 ml-2">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-zinc-300">
                    <Check className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={plan.ctaLink}
                className={`block w-full py-3 px-6 rounded-lg font-medium text-center transition-all ${
                  plan.highlighted
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_20px_rgba(168,85,247,0.4)]'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
