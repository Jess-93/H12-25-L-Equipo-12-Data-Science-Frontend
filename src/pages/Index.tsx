import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { Hero } from '@/components/Hero';
import { PredictionForm } from '@/components/PredictionForm';
import { ResultCard } from '@/components/ResultCard';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { PredictionRequest, PredictionResponse, mockPredictFlight, predictFlight } from '@/lib/api';

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async (data: PredictionRequest) => {
    setIsLoading(true);
    setResult(null);

    try {
      // Try real API first, fallback to mock
      let response: PredictionResponse;
      const fecha = new Date(data.fecha_partida);
        
      const horas = fecha.getUTCHours();
      const minutos = fecha.getUTCMinutes();
      
      // Lógica: HHMM si hay minutos, solo HH si minutos es 0
      const time = minutos === 0 ? horas : (horas * 100) + minutos;

      // Desestructuración para omitir fecha_partida
      const { fecha_partida, ...resto } = data;

      const vueloFormateado = {
        ...resto,
        day: fecha.getUTCDate(),
        month: fecha.getUTCMonth() + 1,
        year: fecha.getUTCFullYear(),
        scheduled_departure: time
      }

      console.log(vueloFormateado);
      try {
        response = await predictFlight(vueloFormateado);
      } catch {
        // Fallback to mock for demo purposes
        response = await mockPredictFlight(vueloFormateado);
        
        toast.info('Usando datos de demostración', {
          description: 'El servidor no está disponible. Mostrando predicción simulada.',
        });
      }
      const {destination_airport, origin_airport} = data
      const {...restoResponse} = response
      const responseFormateado ={
        ...restoResponse,
        timestamp: new Date(),
        ruta: `${origin_airport} → ${destination_airport}` //'punto 1  punto 2',
      }

      setResult(responseFormateado);
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      // Save to localStorage for history
      const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
      history.unshift({ ...data, result: response, timestamp: new Date().toISOString() });
      localStorage.setItem('predictionHistory', JSON.stringify(history.slice(0, 10)));

    } catch (error) {
      toast.error('Error al procesar la predicción', {
        description: 'Por favor, intenta nuevamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    document.getElementById('prediction-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      
      <Hero />
      
      {!result && (
        <PredictionForm onSubmit={handlePredict} isLoading={isLoading} />
      )}
      
      {result && (
        <div id="result-section">
          <ResultCard result={result} onReset={handleReset} />
        </div>
      )}
      
      <HowItWorks />
      
      <Footer />
    </div>
  );
};

export default Index;
