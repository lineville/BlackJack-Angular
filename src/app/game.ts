import { Player } from './player'
import { Deck } from './deck'
import { Chart } from 'chart.js'

export class Game {
  bet: number
  luckylucky: number
  handNumber: number
  deck: Deck
  human: Player
  dealer: Player
  playing: boolean
  dealerTurn: boolean
  showSecondScore: boolean
  handOver: boolean
  message: string
  color: string
  showScore: boolean
  peek: boolean
  balanceList: number[]
  chart: Chart

  constructor() {
    this.bet = 10
    this.handNumber = 0
    this.deck = new Deck()
    this.human = new Player(false)
    this.dealer = new Player(true)
    this.playing = true
    this.dealerTurn = false
    this.message = ''
    this.color = 'black'
    this.showScore = false
    this.balanceList = []
    this.showSecondScore = false
    this.peek = false
    this.handOver = false
    // this.chart = new Chart(
    //   document.getElementById('myChart').getContext('2d'),
    //   {
    //     type: 'line',

    //     data: {
    //       labels: [
    //         '0',
    //         '10',
    //         '20',
    //         '30',
    //         '40',
    //         '50',
    //         '60',
    //         '70',
    //         '80',
    //         '90',
    //         '100',
    //       ],
    //       datasets: [
    //         {
    //           label: 'Earning Trends',
    //           backgroundColor: 'rgb(255, 99, 132)',
    //           borderColor: 'rgb(255, 99, 132)',
    //           data: this.balanceList,
    //         },
    //       ],
    //     },

    //     // Configuration options go here
    //     options: {},
    //   }
    // )
  }

  hit(p: Player, splitHands: boolean): void {
    if (!splitHands) {
      if (
        (!this.dealerTurn && !p.isDealer) ||
        (this.dealerTurn && p.isDealer)
      ) {
        let card = this.deck.deal()

        p.upperScore += card.value
        p.lowerScore += card.optionalValue
        if (p.lowerScore > 21) {
          p.isBusted = true
        }

        p.hand.push(card)
        this.checkForBust(p)
      }
    } else {
      if (
        (!this.dealerTurn && !p.isDealer) ||
        (this.dealerTurn && p.isDealer)
      ) {
        let card = this.deck.deal()

        p.secondUpperScore += card.value
        p.secondLowerScore += card.optionalValue
        if (p.secondLowerScore > 21) {
          p.isSecondBusted = true
        }

        p.secondHand.push(card)
        this.checkForBust(p)
      }
    }
  }

  checkForBust(p: Player): void {
    if (p.isBusted) {
      this.message = 'You busted!'
      p.winnings -= this.bet
      this.color = 'red'
      this.handOver = true

      // * Check for auto next hand mode ?
      // this.nextHand()
    }
  }

  shouldDealerHit(): boolean {
    let shouldHit = true
    // !! A 6 8 -> 15 or 25
    // * Cant hit if busted
    if (this.dealer.isBusted) {
      shouldHit = false
      return shouldHit
    }

    // * Got an 18, 19, 20 or 21 so stay
    if (
      (this.dealer.lowerScore <= 21 && this.dealer.lowerScore > 17) ||
      (this.dealer.upperScore <= 21 && this.dealer.upperScore > 17)
    ) {
      shouldHit = false
      return shouldHit
    }

    // * Dealer has an Ace in hand
    if (this.dealer.hand.some(c => c.name === 'Ace')) {
      // A 2 ... A 6 hit
      if (this.dealer.lowerScore <= 7) {
        shouldHit = true
      }
      // A 7 ... A 10 stay
      if (this.dealer.lowerScore >= 8 && this.dealer.lowerScore <= 11) {
        shouldHit = false
      }
      // A 11 ...A 15 hit
      if (this.dealer.lowerScore >= 12 && this.dealer.lowerScore <= 16) {
        shouldHit = true
      }
      // A 16 ... A 20 stay
      if (this.dealer.lowerScore >= 17) {
        shouldHit = false
      }
    } else {
      // * Dealer has a hard hand (no ace)
      shouldHit = this.dealer.upperScore < 17
    }
    return shouldHit
  }

  // * Returns 1 if player ones, -1 if dealer wins, 0 if tie
  whoWins(): number {
    const dealerScore =
      this.dealer.upperScore > 21
        ? this.dealer.lowerScore
        : this.dealer.upperScore
    const playerScore =
      this.human.upperScore > 21 ? this.human.lowerScore : this.human.upperScore
    if (playerScore > dealerScore) {
      return 1
    } else if (dealerScore > playerScore) {
      return -1
    } else {
      return 0
    }
  }

  stand(): void {
    // * Set it to dealers turn to disable buttons
    this.dealerTurn = true

    // * Case 1 : Player has BJ and dealer does not -- player win extra
    if (this.human.hasBlackJack() && !this.dealer.hasBlackJack()) {
      this.message =
        'BlackJack Congrats! That pays out at 2:1 odds\nYou won ' +
        this.bet * 2 +
        ' dollars!'
      this.human.winnings += this.bet * 2
      this.color = 'green'
    }
    // * Case 2 : Player has BJ and dealer does too -- push
    else if (this.human.hasBlackJack() && this.dealer.hasBlackJack()) {
      this.message = 'You tied ... keep your money!'
      this.color = 'black'
    }
    // * Case 3 : Dealer has BJ and player does not
    else if (this.dealer.hasBlackJack()) {
      this.message = 'Sorry the dealer has Black Jack!'
      this.human.winnings -= this.bet
      this.color = 'red'
    }
    // * Case 4 : Player not have BJ -- dealer hits until bust or stop
    else {
      // * No blackjacks
      // * Dealer plays out
      while (this.shouldDealerHit()) {
        this.hit(this.dealer, false)
      }
      // * Both players finished playing -- check outcomes

      // * Case 3a : Dealer busted -- player wins
      if (this.dealer.isBusted) {
        this.message = 'Dealer busted! You won ' + this.bet + ' dollars!'
        this.human.winnings += this.bet
        this.color = 'green'
      }

      // * Neither have busted
      else {
        let winner = this.whoWins()
        switch (winner) {
          // * Case 1 : Dealer score is lower than player -- player wins
          case 1:
            this.message = 'You won ' + this.bet + ' dollars!'
            this.human.winnings += this.bet
            this.color = 'green'
            break

          // * Case 2 : Dealer score is higher than player -- dealer wins
          case -1:
            // * Check which of the dealers scores to put in the message
            if (this.dealer.upperScore > 21) {
              this.message =
                'You lost ' +
                this.bet +
                ' dollars! Sorry the dealer had ' +
                this.dealer.lowerScore
            } else {
              this.message =
                'You lost ' +
                this.bet +
                ' dollars! Sorry the dealer had ' +
                this.dealer.upperScore
            }
            // * Player loses money
            this.human.winnings -= this.bet
            this.color = 'red'
            break

          // * Case 3 : Dealer score is same as player -- push
          case 0:
            this.message = 'You tied ... keep your money!'
            this.color = 'black'
            break

          default:
            break
        }
      }
    }
    this.handOver = true
  }

  double(): void {
    if (this.human.hand.length == 2) {
      if (!this.dealerTurn) {
        this.bet = this.bet * 2
        this.hit(this.human, false)
        this.dealerTurn = true
      }
      if (!this.human.isBusted) {
        this.stand()
      }
    }
  }

  split(): void {
    if (
      this.human.hand.length == 2 &&
      this.human.hand[0].name == this.human.hand[1].name
    ) {
      this.human.hand = this.human.hand.slice(0, 1)
      this.human.secondHand = this.human.hand.slice(0, 1)
    }
    this.human.isSecondBusted = false
    this.human.lowerScore = this.human.hand[0].optionalValue
    this.human.upperScore = this.human.hand[0].value
    this.human.secondLowerScore = this.human.secondHand[0].optionalValue
    this.human.secondUpperScore = this.human.secondHand[0].value
    this.showSecondScore = true
    this.bet *= 2
  }

  addData(chart: Chart, label, data) {
    chart.data.labels.push(label)
    chart.data.datasets.forEach(dataset => {
      dataset.data.push(data)
    })
    chart.update()
  }

  nextHand(): void {
    this.message = ''
    this.human.hand = []
    this.human.secondHand = []
    this.dealer.hand = []
    this.human.lowerScore = 0
    this.human.upperScore = 0
    this.human.secondLowerScore = 0
    this.human.secondUpperScore = 0
    this.dealer.lowerScore = 0
    this.dealer.upperScore = 0
    this.showSecondScore = false
    this.human.isBusted = false
    this.dealer.isBusted = false
    this.handOver = false

    this.dealerTurn = false
    // this.bet = 10
    this.handNumber++
    this.balanceList.push(this.human.winnings)

    // this.chart.update()
    // this.addData(this.chart, this.handNumber, this.human.winnings)
    // * Shuffle a new deck if we have less than 15 cards left
    if (this.deck.cards.length < 15) {
      this.deck = new Deck()
    }
    // * Deal two cards to player
    let card1 = this.deck.deal()
    let card2 = this.deck.deal()

    this.human.upperScore = card1.value + card2.value
    this.human.lowerScore = card1.optionalValue + card2.optionalValue

    this.human.hand.push(card1)
    this.human.hand.push(card2)

    let upcard = this.deck.deal()
    let downcard = this.deck.deal()
    // * 2 Ace edge case for dealer: set low to 12 and high to 22 instead of 2 and 22
    if (downcard.name == 'Ace' && upcard.name == 'Ace') {
      this.dealer.upperScore = upcard.value + downcard.value
      this.dealer.lowerScore = upcard.value + downcard.optionalValue
    } else {
      this.dealer.upperScore = upcard.value + downcard.value
      this.dealer.lowerScore = upcard.optionalValue + downcard.optionalValue
    }

    this.dealer.hand.push(upcard)
    this.dealer.hand.push(downcard)
  }
}
