import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, MapPin, Ruler, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AIRLINES, AIRPORTS, getDistance } from '@/lib/airports';
import { PredictionRequest } from '@/lib/api';

interface PredictionFormProps {
  onSubmit: (data: PredictionRequest) => void;
  isLoading: boolean;
}

export const PredictionForm = ({ onSubmit, isLoading }: PredictionFormProps) => {
  const [airline, setAirline] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [distance, setDistance] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-calculate distance when origin/destination changes
  useEffect(() => {
    if (origin && destination && origin !== destination) {
      const calculatedDistance = getDistance(origin, destination);
      setDistance(calculatedDistance);
    }
  }, [origin, destination]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!airline) newErrors.airline = 'Selecciona una aerolínea';
    if (!origin) newErrors.origin = 'Selecciona el aeropuerto de origen';
    if (!destination) newErrors.destination = 'Selecciona el aeropuerto de destino';
    if (origin && destination && origin === destination) {
      newErrors.destination = 'El destino debe ser diferente al origen';
    }
    if (!dateTime) newErrors.dateTime = 'Selecciona la fecha y hora de salida';
    if (!distance || distance <= 0) newErrors.distance = 'La distancia debe ser mayor a 0';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    onSubmit({
      airline: airline,
      origin_airport: origin,
      destination_airport: destination,
      fecha_partida: new Date(dateTime).toISOString(),
      distance: distance,
    });
  };

  return (
    <section id="prediction-form" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ingresa los datos de tu vuelo
          </h2>
          <p className="text-muted-foreground text-lg">
            Completa el formulario para obtener una predicción instantánea
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-6"
          >
            {/* Airline */}
            <div className="space-y-2">
              <Label htmlFor="airline" className="flex items-center gap-2 text-foreground font-medium">
                <Plane className="w-4 h-4 text-secondary" />
                Aerolínea
              </Label>
              <Select value={airline} onValueChange={setAirline}>
                <SelectTrigger 
                  id="airline" 
                  className={`h-12 bg-background ${errors.airline ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder="Selecciona una aerolínea" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {AIRLINES.map((a) => (
                    <SelectItem key={a.code} value={a.code}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: a.color }}
                        />
                        <span className="font-medium">{a.code}</span>
                        <span className="text-muted-foreground">- {a.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.airline && (
                <p className="text-sm text-destructive">{errors.airline}</p>
              )}
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-success" />
                  Origen
                </Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger 
                    id="origin" 
                    className={`h-12 bg-background ${errors.origin ? 'border-destructive' : ''}`}
                  >
                    <SelectValue placeholder="Aeropuerto de origen" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {AIRPORTS.map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{a.code}</span>
                          <span className="text-muted-foreground text-sm">- {a.city}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.origin && (
                  <p className="text-sm text-destructive">{errors.origin}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-destructive" />
                  Destino
                </Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger 
                    id="destination" 
                    className={`h-12 bg-background ${errors.destination ? 'border-destructive' : ''}`}
                  >
                    <SelectValue placeholder="Aeropuerto de destino" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {AIRPORTS.filter(a => a.code !== origin).map((a) => (
                      <SelectItem key={a.code} value={a.code}>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{a.code}</span>
                          <span className="text-muted-foreground text-sm">- {a.city}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.destination && (
                  <p className="text-sm text-destructive">{errors.destination}</p>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="space-y-2">
              <Label htmlFor="datetime" className="flex items-center gap-2 text-foreground font-medium">
                <Calendar className="w-4 h-4 text-accent" />
                Fecha y hora de salida
              </Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className={`h-12 bg-background ${errors.dateTime ? 'border-destructive' : ''}`}
              />
              {errors.dateTime && (
                <p className="text-sm text-destructive">{errors.dateTime}</p>
              )}
            </div>

            {/* Distance */}
            <div className="space-y-2">
              <Label htmlFor="distance" className="flex items-center gap-2 text-foreground font-medium">
                <Ruler className="w-4 h-4 text-secondary" />
                Distancia (km)
              </Label>
              <div className="relative">
                <Input
                  id="distance"
                  type="number"
                  value={distance || ''}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className={`h-12 bg-background pr-12 ${errors.distance ? 'border-destructive' : ''}`}
                  placeholder="Ingresa la distancia"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                  km
                </span>
              </div>
              {distance > 0 && origin && destination && (
                <p className="text-sm text-muted-foreground">
                  Distancia calculada automáticamente para la ruta {origin} → {destination}
                </p>
              )}
              {errors.distance && (
                <p className="text-sm text-destructive">{errors.distance}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analizando...
                </>
              ) : (
                <>
                  <Plane className="w-5 h-5 mr-2" />
                  Predecir vuelo
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
