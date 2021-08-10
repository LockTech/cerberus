import { randomStr, RandomStrMaxLength } from './randomStr'

describe('randomStr util', () => {
  it('generates a random string of uppercase, alphanumeric characters', () => {
    const res = randomStr(5)

    expect(res).toBeDefined()
    expect(res.length).toBe(5)
  })

  it('generates a random string of the given length', () => {
    const len = Math.floor(Math.random() * 254 + 1)
    const res = randomStr(len)

    expect(res).toBeDefined()
    expect(res.length).toBe(len)
  })

  it('ensures length is greater than 0', () => {
    const res = randomStr(0)

    expect(res).toBeDefined()
    expect(res.length).toBe(1)
  })

  it(`ensures length is less than ${RandomStrMaxLength}`, () => {
    const res = randomStr(RandomStrMaxLength + 10)

    expect(res).toBeDefined()
    expect(res.length).toBe(RandomStrMaxLength)
  })
})
