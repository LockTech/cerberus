import { template } from './template'

describe('template lib', () => {
  describe('template', () => {
    it('renders a template from a string', () => {
      const res = template('Hello {{ it.world }}', { world: 'World' })

      expect(res).toBe('Hello World')
      expect(res).not.toBe('Hello {{ it.world }}')
      expect(res).not.toBe('Hello')
      expect(res).not.toBe('Hello ')
      expect(res).not.toBe('')
      expect(res).not.toStrictEqual({})
    })
  })
})
