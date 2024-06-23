export interface PokeResponse {
  count: number;
  next: string;
  previous: string;
  results: PokeItem[];
}

export interface PokeItem {
  name: string;
  url: string;
  detail: any;
}
