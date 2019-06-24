export class Card {
  name: string
  value: number
  optionalValue: number
  suite: string
  image: string

  constructor(name: string, val: number, suite: string) {
    this.name = name
    this.value = val
    this.optionalValue = val
    this.suite = suite
    this.image = this.getImage()
  }

  // * Gets the string path to the image Ex: Ace Spades -> assets/AS.jpg
  getImage(): string {
    let str = 'assets/'
    // * Handles the edge case for the 10 w two characters
    if (this.name == '10') {
      str += this.name.substring(0, 2)
    } else {
      str += this.name.charAt(0).toUpperCase()
    }
    str += this.suite.charAt(0).toUpperCase()
    str += '.jpg'
    return str
  }
}
