import scrapedStratagems from '@util/stratagemInfo.json'
import Direction, { keyCodeToDirection } from '@util/Direction'

/*
 * Class to contain info regarding each stratagem.
 */
export class StratagemInfo {
  name: string
  image: string
  pattern: Direction[]

  /*
   * @param {string}  name    Name of stratagem.
   * @param {string}  image   Src URL for stratagem sprite.
   * @param {string}  pattern WASD pattern of required inputs to activate.
   */
  constructor(name: string, image: string, pattern: string) {
    this.name = name
    this.image = image
    this.pattern = StratagemInfo.stringToDirections(pattern)
  }

  /*
   * Given a list of inputs, check that the pattern matches up to the shortest
   * length.
   * @param {Direction[]} inputs  A list of directions to compare against.
   */
  checkCorrect(inputs: Direction[]) {
    return inputs.every((direction, idx) => this.pattern[idx] == direction)
  }

  checkComplete(inputs: Direction[]) {
    return inputs.length === this.pattern.length && this.checkCorrect(inputs)
  }

  /*
   * Convert WASD String of inputs to Direction form.
   * @param {string} pattern  WASD String to convert.
   */
  static stringToDirections(pattern: string) {
    return Array.from(pattern).map((char) => keyCodeToDirection[char])
  }
}

/*
 * @param {StratagemInfo[]} stratagems A list of stratagems for play.
 */
const stratagems = scrapedStratagems.map(
  (s: { name: string; thumbnail: string; code: string }) =>
    new StratagemInfo(
      s.name,
      `thumbnails/${s.thumbnail.split('/')[s.thumbnail.split('/').length - 1]}`,
      s.code
    )
)

export default stratagems
