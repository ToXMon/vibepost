'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote:
      'VibePost became our internal edge feed. We now ship faster because the writeups include decisions, tradeoffs, and what broke.',
    author: 'Alex Chen',
    role: 'Staff Engineer',
    avatar: 'AC',
  },
  {
    quote:
      'The premium posts are practical and monetizable. It feels like getting architecture notes from teams already ahead of us.',
    author: 'Sarah Miller',
    role: 'Founder',
    avatar: 'SM',
  },
  {
    quote:
      'Finally a signal-first AI dev publication. Less hype, more implementation details I can reuse the same day.',
    author: 'Marcus Johnson',
    role: 'Full-Stack Developer',
    avatar: 'MJ',
  },
];

export default function Testimonials() {
  return (
    <section className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Built for teams that actually ship</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Social proof from builders using VibePost to turn AI workflows into repeatable output.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 transition-all hover:-translate-y-1 hover:border-purple-400/40"
            >
              <Quote className="mb-4 h-8 w-8 text-purple-300/40" />
              <p className="mb-6 leading-relaxed text-zinc-200">“{testimonial.quote}”</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-purple-600/20 text-sm font-medium text-purple-200">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
