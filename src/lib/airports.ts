export interface Airport {
  code: string;
  name: string;
  city: string;
}

export const AIRPORTS: Airport[] = [
  { code: "GIG", name: "Galeão International", city: "Rio de Janeiro" },
  { code: "GRU", name: "Guarulhos International", city: "São Paulo" },
  { code: "CGH", name: "Congonhas", city: "São Paulo" },
  { code: "BSB", name: "Presidente Juscelino Kubitschek", city: "Brasília" },
  { code: "CNF", name: "Tancredo Neves International", city: "Belo Horizonte" },
  { code: "SDU", name: "Santos Dumont", city: "Rio de Janeiro" },
  { code: "POA", name: "Salgado Filho International", city: "Porto Alegre" },
  { code: "MAO", name: "Eduardo Gomes International", city: "Manaus" },
];

export interface Airline {
  code: string;
  name: string;
  color: string;
}

export const AIRLINES: Airline[] = [
  { code: "AZ", name: "Azul Linhas Aéreas", color: "#0033A0" },
  { code: "LA", name: "LATAM Airlines", color: "#E40520" },
  { code: "G3", name: "Gol Transportes Aéreos", color: "#FF6600" },
];

// Distance matrix in km (approximate)
export const DISTANCES: Record<string, Record<string, number>> = {
  GIG: { GRU: 350, CGH: 360, BSB: 930, CNF: 340, SDU: 5, POA: 1130, MAO: 2850 },
  GRU: { GIG: 350, CGH: 15, BSB: 870, CNF: 490, SDU: 355, POA: 860, MAO: 2720 },
  CGH: { GIG: 360, GRU: 15, BSB: 880, CNF: 500, SDU: 365, POA: 870, MAO: 2730 },
  BSB: { GIG: 930, GRU: 870, CGH: 880, CNF: 620, SDU: 935, POA: 1620, MAO: 1950 },
  CNF: { GIG: 340, GRU: 490, CGH: 500, BSB: 620, SDU: 345, POA: 1080, MAO: 2500 },
  SDU: { GIG: 5, GRU: 355, CGH: 365, BSB: 935, CNF: 345, POA: 1135, MAO: 2855 },
  POA: { GIG: 1130, GRU: 860, CGH: 870, BSB: 1620, CNF: 1080, SDU: 1135, MAO: 3360 },
  MAO: { GIG: 2850, GRU: 2720, CGH: 2730, BSB: 1950, CNF: 2500, SDU: 2855, POA: 3360 },
};

export const getDistance = (origin: string, destination: string): number => {
  if (origin === destination) return 0;
  return DISTANCES[origin]?.[destination] || 0;
};
