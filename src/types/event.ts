import { Group } from "./group";

interface PriceBand {
  type: "Early bird" | "Standard" | "VIP";
  price: string;
  ticketCount: number;
}

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

export interface Event {
  id: number;
  image: string;
  title: string;
  date: number;
  group: Group | number;
  duration: string;
  priceBands?: PriceBand[];
  going: number;
  capacity: number;
  availability: number;
  startTime: string;
  free: boolean;
  category: string;
  tags: string[];
  description: string[];
  attendees?: number[];
  location: Location;
  approved: boolean;
}
