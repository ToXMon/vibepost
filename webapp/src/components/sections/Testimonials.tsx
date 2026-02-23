'use client';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "VibePost has become my go-to source for staying current with AI coding patterns. The code examples are production-ready, not toy demos.",
    author: "Alex Chen",
    role: "Senior Engineer, Vercel",
    avatar: "AC"
  },
  {
    quote: "The weekly digest saves me hours of research. I get actionable insights delivered before they hit the mainstream.",
    author: "Sarah Miller",
    role: "Founder, AI Startup",
    avatar: "SM"
  },
  {
    quote: "Best investment I've made for leveling up my AI-assisted development workflow. The premium content is worth every penny.",
    author: "Marcus Johnson",
    role: "Full Stack Developer",
    avatar: "MJ"
  }
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Developers Say
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Join thousands of developers building smarter with AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <Quote className="w-8 h-8 text-purple-500/30 mb-4" />
              <p className="text-zinc-300 mb-6 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-400 font-medium text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-medium">{testimonial.author}</p>
                  <p className="text-zinc-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
