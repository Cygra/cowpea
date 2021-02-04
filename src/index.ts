import * as fs from 'fs'
import { suffixSlash } from './utils'

class Cowpea {
  private fromDir: string = ''
  private toDir: string = ''

  public from = (fromDir: string): Cowpea => {
    this.fromDir = suffixSlash(fromDir)
    return this
  }

  public to = (toDir: string): Cowpea => {
    this.toDir = suffixSlash(toDir)
    if (!fs.existsSync(this.toDir)) fs.mkdirSync(this.toDir)
    return this
  }

  public copy = (src: string, dest?: string): Cowpea => {
    const from = `${this.fromDir}${src}`
    const to = `${this.toDir}${dest || src}`
    fs.copyFileSync(from, to)
    console.log(`COPY ${from} -> ${to} OK`)
    return this
  }
}

export default new Cowpea()
