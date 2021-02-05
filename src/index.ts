import * as fs from 'fs'
import { suffixSlash } from './utils'

class Cowpea {
  private fromDir: string = './'
  private toDir: string = './'

  private onCopy = (from: string, to: string, processor?: (content: string) => string) => {
    if (processor) {
      fs.writeFileSync(to, processor(fs.readFileSync(from, 'utf-8')))
    } else {
      fs.copyFileSync(from, to)
    }
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

  public copy = (
    src: string,
    options?: {
      dest?: string
      processor?: (content: string) => string
    },
  ): Cowpea => {
    this.onCopy(`${this.fromDir}${src}`, `${this.toDir}${options?.dest ?? src}`, options?.processor)
    return this
  }

  public copyDirectory = (options?: {
    filter?: (fileName: string) => string | null
    processor?: (content: string) => string
  }): Cowpea => {
    fs.readdirSync(this.fromDir).forEach((file: string) => {
      const from = `${this.fromDir}${file}`
      const dest = options?.filter ? options?.filter(file) : file
      if (dest) {
        this.onCopy(from, `${this.toDir}${dest}`, options?.processor)
      } else {
        console.log(`${from} SKIPPED`)
      }
    })
    return this
  }
}

export default new Cowpea()
