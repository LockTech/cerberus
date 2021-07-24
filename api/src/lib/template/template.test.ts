import { template, templateFile } from './template'

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

  describe('templateFile', () => {
    it('renders a template from a file', () => {
      const res = templateFile(`${__dirname}/template.test.html`, {
        world: 'World',
      })

      expect(res).toBe('<h1>Hello World</h1>')
      expect(res).not.toBe('<h1>Hello {{ it.world }}</h1>')
      expect(res).not.toBe('<h1>Hello</h1>')
      expect(res).not.toBe('<h1>Hello </h1>')
      expect(res).not.toBe('Hello World')
      expect(res).not.toBe('Hello {{ it.world }}')
      expect(res).not.toBe('Hello')
      expect(res).not.toBe('Hello ')
      expect(res).not.toBe('')
      expect(res).not.toStrictEqual({})
    })
  })
})
