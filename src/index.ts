import * as fs from 'fs'
import { suffixSlash } from './utils'

class Cowpea {
  private fromDir: string = './'
  private toDir: string = './'

  private onCopy = (from: string, to: string) => {
    fs.copyFileSync(from, to)
    console.log(`COPY ${from} -> ${to} OK`)
  }

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
    this.onCopy(`${this.fromDir}${src}`, `${this.toDir}${dest || src}`)
    return this
  }

  public copyDirectory = (filter?: (fileName: string) => string | null): Cowpea => {
    fs.readdirSync(this.fromDir).forEach((file: string) => {
      const from = `${this.fromDir}${file}`
      const dest = filter ? filter(file) : file
      if (dest) {
        this.onCopy(from, `${this.toDir}${dest}`)
      } else {
        console.log(`${from} SKIPPED`)
      }
    })
    return this
  }
}

export default new Cowpea()
