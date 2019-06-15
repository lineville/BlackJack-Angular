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
    // var ctx = document.getElementById('myChart').getContext('2d')
    // this.game.chart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: [
    //       '0',
    //       '10',
    //       '20',
    //       '30',
    //       '40',
    //       '50',
    //       '60',
    //       '70',
    //       '80',
    //       '90',
    //       '100',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Earning Trends',
    //         backgroundColor: 'rgb(255, 99, 132)',
    //         borderColor: 'rgb(255, 99, 132)',
    //         data: this.game.balanceList,
    //         width: 400,
    //         height: 200,
    //       },
    //     ],
    //   },
    //   // Configuration options go here
    //   options: {},
    // })
  }
}
