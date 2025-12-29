import { motion } from 'framer-motion';
import { FileInput, BrainCircuit, Zap } from 'lucide-react';

const steps = [
  {
    icon: FileInput,
    title: 'Ingresa los datos',
    description: 'Proporciona la información de tu vuelo: aerolínea, origen, destino y fecha de salida.',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    icon: BrainCircuit,
    title: 'IA analiza patrones',
    description: 'Nuestro modelo de machine learning analiza miles de datos históricos de vuelos.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Zap,
    title: 'Predicción instantánea',
    description: 'Obtén una predicción precisa sobre la puntualidad de tu vuelo en segundos.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tres simples pasos para conocer si tu vuelo llegará a tiempo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full h-px bg-border" />
              )}

              <div className="glass-card rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 relative">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${step.bgColor} flex items-center justify-center`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
