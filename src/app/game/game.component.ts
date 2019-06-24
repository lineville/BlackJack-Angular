import { Component, OnInit, OnChanges } from '@angular/core'
import { Game } from '../game'
import { Chart } from 'chart.js'
import { SimpleChanges } from '@angular/core'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnChanges {
  game: Game

  constructor() {
    this.game = new Game()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.game.chart.data.datasets[0].data.push(this.game.human.winnings)
  }

  ngOnInit() {
    this.game.nextHand()
  }
}
