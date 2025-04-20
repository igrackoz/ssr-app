import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {

    this.title.setTitle('Pokemons Page');
    this.meta.updateTag(
      { name: 'description', content: 'Este es mi Pokemons page' }
    );    
    this.meta.updateTag(
      { name: 'og:title', content: 'Este es mi Pokemons page' }
    );
    this.meta.updateTag(
      { name: 'keywords', content: 'hola,mundo,hector,ortiz,curso,angular' }
    );
  }
}
