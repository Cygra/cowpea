const cowpea = require('../src').default
const fs = require('fs')
jest.mock('fs')

describe('cowpea test', () => {
  beforeAll(() => {
    fs.readFileSync.mockReturnValue('lorem ipsum')
    fs.readdirSync.mockReturnValue([])
  })
  test('init from and to Dir', () => {
    expect(cowpea.fromDir).toBe('./')
    expect(cowpea.toDir).toBe('./')
  })
  test('change `from` directory', () => {
    expect(cowpea.from('./foo')).toBe(cowpea)
    expect(cowpea.fromDir).toBe('./foo/')
  })
  test('create new `to` directory', () => {
    expect(cowpea.to('./bar')).toBe(cowpea)
    expect(cowpea.toDir).toBe('./bar/')
    expect(fs.mkdirSync).toBeCalledWith('./bar/')
  })
  test('copy without options', () => {
    expect(cowpea.copy('foo.js')).toBe(cowpea)
    expect(fs.copyFileSync).toBeCalledWith('./foo/foo.js', './bar/foo.js')
  })
  test('copy with dest', () => {
    expect(cowpea.copy('foo.js', { dest: 'bar.js' })).toBe(cowpea)
    expect(fs.copyFileSync).toBeCalledWith('./foo/foo.js', './bar/bar.js')
  })
  test('copy with dest and processor ', () => {
    expect(cowpea.copy('foo.js', { dest: 'bar.js', processor: (content: string) => `${content} ${content}` })).toBe(
      cowpea,
    )
    expect(fs.readFileSync).toBeCalledWith('./foo/foo.js', 'utf-8')
    expect(fs.writeFileSync).toBeCalledWith('./bar/bar.js', 'lorem ipsum lorem ipsum')
  })
  test('copy directory', () => {
    expect(cowpea.copyDirectory()).toBe(cowpea)
    expect(fs.readdirSync).toBeCalledWith(cowpea.fromDir)
  })
})
