import { motion } from 'framer-motion';
import { Plane, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToForm = () => {
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-[hsl(243_75%_45%)] to-secondary">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        
        {/* Cloud-like shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary-foreground/5 rounded-full"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 60 + 30,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 30, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Animated airplane */}
          <motion.div 
            className="mb-8 inline-block"
            animate={{ 
              y: [0, -15, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-accent/30 blur-2xl rounded-full scale-150" />
              <Plane className="relative w-20 h-20 md:w-28 md:h-28 text-primary-foreground drop-shadow-2xl" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Predice si tu vuelo{' '}
            <span className="relative">
              <span className="relative z-10">llegará a tiempo</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/40 -skew-x-3" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Utiliza inteligencia artificial para conocer la probabilidad de retraso de tu próximo vuelo. 
            Datos en tiempo real y predicciones precisas.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-lg px-8 py-6 rounded-full shadow-2xl hover:shadow-glow transition-all duration-300 group"
            >
              Comenzar predicción
              <ArrowDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats bar */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {[
              { value: '95%', label: 'Precisión' },
              { value: '10K+', label: 'Predicciones' },
              { value: '3', label: 'Aerolíneas' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/60 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-primary-foreground/50" />
      </motion.div>
    </section>
  );
};
