import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Clock, Plane, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PredictionResponse } from '@/lib/api';

interface ResultCardProps {
  result: PredictionResponse | null;
  onReset: () => void;
}

export const ResultCard = ({ result, onReset }: ResultCardProps) => {
  if (!result) return null;

  const isOnTime = result.prevision === 'Puntual';
  const percentage = Math.round(result.probabilidad * 100);
  const [origin, destination] = result.ruta.split(' → ');

  return (
    <AnimatePresence>
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className={`rounded-3xl p-8 md:p-10 text-center ${
              isOnTime 
                ? 'bg-gradient-to-br from-success to-[hsl(160_70%_35%)] shadow-glow-success' 
                : 'bg-gradient-to-br from-accent to-[hsl(25_95%_45%)] shadow-glow-error'
            }`}
          >
            {/* Status Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="mb-6"
            >
              {isOnTime ? (
                <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 mx-auto text-success-foreground drop-shadow-lg" />
              ) : (
                <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 mx-auto text-accent-foreground drop-shadow-lg" />
              )}
            </motion.div>

            {/* Prediction Text */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-4 uppercase tracking-wider"
            >
              {result.prevision}
            </motion.h2>

            {/* Probability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              {/* Circular Progress */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary-foreground/20"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeLinecap="round"
                    className="text-primary-foreground"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ 
                      strokeDashoffset: 2 * Math.PI * 56 * (1 - result.probabilidad) 
                    }}
                    transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span 
                    className="text-3xl font-bold text-primary-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    {percentage}%
                  </motion.span>
                </div>
              </div>
              <p className="text-primary-foreground/80 text-lg">
                Probabilidad de {isOnTime ? 'llegar a tiempo' : 'retraso'}
              </p>
            </motion.div>

            {/* Route Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 mb-8"
            >
              <div className="flex items-center justify-center gap-4 text-primary-foreground">
                <div className="text-center">
                  <div className="text-3xl font-bold">{origin}</div>
                  <div className="text-sm text-primary-foreground/70">Origen</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-px bg-primary-foreground/50" />
                  <Plane className="w-6 h-6 animate-airplane" />
                  <ArrowRight className="w-4 h-4" />
                  <div className="w-8 h-px bg-primary-foreground/50" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{destination}</div>
                  <div className="text-sm text-primary-foreground/70">Destino</div>
                </div>
              </div>
            </motion.div>

            {/* Timestamp */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 text-primary-foreground/70 text-sm mb-8"
            >
              <Clock className="w-4 h-4" />
              <span>
                Predicción realizada: {new Date(result.timestamp).toLocaleString('es-ES')}
              </span>
            </motion.div>

            {/* Reset Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={onReset}
                variant="outline"
                className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Nueva predicción
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </AnimatePresence>
  );
};
