import { Plane, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-8 h-8" />
              <span className="font-display text-2xl font-bold">FlightOnTime</span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed">
              Predicciones de vuelos impulsadas por inteligencia artificial. 
              Viaja con confianza, planifica con certeza.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Enlaces</h4>
            <ul className="space-y-2">
              {['Sobre nosotros', 'API Docs', 'GitHub', 'Contacto'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Síguenos</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Mail, label: 'Email' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} FlightOnTime. Todos los derechos reservados.
            </p>
            <p className="text-primary-foreground/60 text-sm">
              Desarrollado con 💙 para viajeros
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
