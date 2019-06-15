import { Component, OnInit, Input } from '@angular/core'

import { Card } from '../card'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() name: string
  @Input() suite: string
  @Input() image: string
  value: number
  card: Card

  constructor() {}

  ngOnInit() {
    this.card = new Card(this.name, this.value, this.suite)
  }
}
