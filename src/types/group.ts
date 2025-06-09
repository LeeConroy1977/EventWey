import { User } from "./user";

interface Location {
  placename: string;
  lng: number;
  lat: number;
}

export interface Group {
  id: number;
  name: string;
  image: string;
  groupAdmins: User[];
  description: string[];
  openAccess: boolean;
  location: Location;
  creationDate: number;
  members?: number[];
  events?: number[];
  category: string;
  approved: boolean;
}
