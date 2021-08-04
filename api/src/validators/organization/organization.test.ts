import { validateOrganizationName as orgName } from './organization'

const Service = 'Foo'

const NameInput = (name: string) => ({ input: { name } })
const NameError = {
  name: 'ValidationError',
  message: 'organization-name-invalid',
}

describe('organization validator', () => {
  describe('validateOrganizationName', () => {
    it('throws when name is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(() => orgName(Service, NameInput(1))).toThrow(NameError)
      expect(() => orgName(Service, NameInput(undefined))).toThrow(NameError)
      expect(() => orgName(Service, NameInput(null))).toThrow(NameError)
      // @ts-expect-error checking failing functionality
      // eslint-disable-next-line prettier/prettier
      expect(() => orgName(Service, NameInput(() => 'test'))).toThrow(NameError)
    })

    it('throws when name is an empty string', () => {
      expect(() => orgName(Service, NameInput(''))).toThrow(NameError)
    })
  })
})
