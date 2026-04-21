export type VesselStatus = 'Underway' | 'At Sea' | 'Moored';

export interface Vessel {
  id: string;
  name: string;
  mmsi: string;
  imo: string;
  type: string;
  status: VesselStatus;
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  course: string;
  destination: string;
  destinationCode: string;
  origin: string;
  eta: string;
  distanceRemaining: string;
  voyageProgress: number;
  lastUpdate: string;
}
