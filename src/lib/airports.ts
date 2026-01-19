export interface Airport {
  code: string;
  name: string;
  city: string;
}

export const AIRPORTS: Airport[] = [
  { code: "GRI", name: "Central Nebraska Regional Airport", city: "Grand Island" },
  { code: "BTV", name: "Burlington International Airport", city: "Burlington" },
  { code: "CEC", name: "Del Norte County Airport", city: "Crescent City" },
  { code: "DBQ", name: "Dubuque Regional Airport", city: "Dubuque" },
  { code: "DTW", name: "Detroit Metropolitan Airport", city: "Detroit" },
  { code: "SBN", name: "South Bend International Airport", city: "South Bend" },
  { code: "SUX", name: "Sioux Gateway Airport	Sioux City", city: "Sioux" },
  { code: "TTN", name: "Trenton Mercer Airport", city: "Trenton" },
  
];

export interface Airline {
  code: string;
  name: string;
  color: string;
}

export const AIRLINES: Airline[] = [
  { code: "AA", name: "American Airlines Inc.", color: "#a00070" },
  { code: "UA", name: "American Airlines Inc.", color: "#E40520" },
  { code: "US", name: "US Airways Inc.", color: "#FF6600" },
  { code: "MQ", name: "American Eagle Airlines Inc.", color: "#02008f" },
  { code: "WN", name: "Southwest Airlines Co.", color: "#004d26" }
];

// Distance matrix in km (approximate)
export const DISTANCES: Record<string, Record<string, number>> = {
  GRI: { BTV: 350, CEC: 360, DBQ: 930, DTW: 340, SBN: 5, SUX: 1130, TTN: 2850 },
  BTV: { GRI: 350, CEC: 15, DBQ: 870, DTW: 490, SBN: 355, SUX: 860, TTN: 2720 },
  CEC: { GRI: 360, BTV: 15, DBQ: 880, DTW: 500, SBN: 365, SUX: 870, TTN: 2730 },
  DBQ: { GRI: 930, BTV: 870, CEC: 880, DTW: 620, SBN: 935, SUX: 1620, TTN: 1950 },
  DTW: { GRI: 340, BTV: 490, CEC: 500, DBQ: 620, SBN: 345, SUX: 1080, TTN: 2500 },
  SBN: { GRI: 5, BTV: 355, CEC: 365, DBQ: 935, DTW: 345, SUX: 1135, TTN: 2855 },
  SUX: { GRI: 1130, BTV: 860, CEC: 870, DBQ: 1620, DTW: 1080, SBN: 1135, TTN: 3360 },
  TTN: { GRI: 2850, BTV: 2720, CEC: 2730, DBQ: 1950, DTW: 2500, SBN: 2855, SUX: 3360 },
};

export const getDistance = (origin: string, destination: string): number => {
  if (origin === destination) return 0;
  return DISTANCES[origin]?.[destination] || 0;
};
