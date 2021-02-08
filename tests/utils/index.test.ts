const { suffixSlash } = require('../../src/utils')

describe('utils test', () => {
  test('suffix slash', () => {
    expect(suffixSlash('./foo')).toBe('./foo/')
    expect(suffixSlash('./foo/')).toBe('./foo/')
  })
})
