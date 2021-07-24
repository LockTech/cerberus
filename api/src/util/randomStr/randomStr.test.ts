import { randomStr } from './randomStr'

describe('randomStr utility', () => {
  it('generates a random string of uppercase, alphanumeric characters', () => {
    const res = randomStr(5)

    expect(res).toBeDefined()
    expect(res.length).toBe(5)
  })

  it('ensures length is greater than 0', () => {
    const res = randomStr(0)

    expect(res).toBeDefined()
    expect(res.length).toBe(1)
  })

  it('ensures length is less than 254', () => {
    const res = randomStr(255)

    expect(res).toBeDefined()
    expect(res.length).toBe(254)
  })
})
