import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PokeDataService } from './poke-data.service'
import { PokeResponse, PokeItem } from './interfaces/poke-list'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PokeDataService]
})
export class AppComponent implements OnInit {
  poke: PokeResponse | null = null;
  url = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0';

  constructor(private srv: PokeDataService) { }

  getPoke(urlToLoad: string): void {
    this.srv.getDataPokeResponse(urlToLoad).subscribe((data: PokeResponse) => {
     this.poke = data;
     console.log(this.poke);
    });
  }

  ngOnInit() {
    this.getPoke(this.url)
  }
}