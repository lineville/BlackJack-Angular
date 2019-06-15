import { Component, OnInit } from '@angular/core'
import { Deck } from '../deck'

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})
export class DeckComponent implements OnInit {
  deck: Deck

  constructor() {
    this.deck = new Deck()
  }
  ngOnInit() {}
}
