import { Card } from './card'

export class Player {
  winnings: number
  upperScore: number
  lowerScore: number
  secondLowerScore: number
  secondUpperScore: number
  isBusted: boolean
  isSecondBusted: boolean
  isDealer: boolean
  hand: Card[]
  secondHand: Card[]

  constructor(isDealer: boolean) {
    this.winnings = 100
    this.upperScore = 0
    this.lowerScore = 0
    this.secondLowerScore = 0
    this.secondUpperScore = 0
    this.isBusted = false
    this.isSecondBusted = true
    this.hand = []
    this.secondHand = []
    this.isDealer = isDealer
  }

  // * Checks if this player has a blackjack (2 cards)
  hasBlackJack(): boolean {
    if (this.hand != null) {
      return this.upperScore == 21 && this.hand.length == 2
    }
  }
}
