import { Card } from './card'

export class Deck {
  deckSize: number = 52
  cards: Card[]
  SUITES: string[] = ['Spades', 'Clubs', 'Hearts', 'Diamonds']
  FACECARDS: string[] = ['Jack', 'Queen', 'King']

  constructor() {
    this.cards = this.fill()
    this.shuffle()
  }

  // * Randomizes the card objects in the deck
  shuffle(): void {
    this.cards.sort(() => Math.random() - 0.5)
  }

  fill(): Card[] {
    let deck = []
    // * Add all the NON-face Cards to the deck
    for (let i = 2; i <= 10; i++) {
      for (let j = 0; j < this.SUITES.length; j++) {
        let suite = this.SUITES[j]
        deck.push(new Card('' + i, i, suite))
      }
    }

    //  * Add the Jacks Queens and Kings
    for (let i = 0; i < this.FACECARDS.length; i++) {
      for (let j = 0; j < this.SUITES.length; j++) {
        let suite = this.SUITES[j]
        deck.push(new Card(this.FACECARDS[i], 10, suite))
      }
    }

    // * Add the aces with the optional of 11
    for (let j = 0; j < this.SUITES.length; j++) {
      let suite = this.SUITES[j]
      let ace = new Card('Ace', 11, suite)
      ace.optionalValue = 1
      deck.push(ace)
    }
    return deck
  }

  // * Deck has been shuffled just pop off the top destructively
  deal(): Card {
    return this.cards.pop()
  }
}
