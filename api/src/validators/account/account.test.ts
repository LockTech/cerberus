import { validateAccountEmail } from './account'

const Service = 'Foo'

const AccEmailInvalid = {
  name: 'ValidationError',
  message: 'account-email-invalid',
}
const AccEmailLength = {
  name: 'ValidationError',
  message: 'account-email-length',
}
const AccEmailReserved = {
  name: 'ValidationError',
  message: 'account-email-reserved',
}

describe('account validator', () => {
  describe('account email', () => {
    it('throws when `email` is not a string', () => {
      expect(() => validateAccountEmail(Service, { email: undefined })).toThrow(
        AccEmailInvalid
      )
      //
      expect(() => validateAccountEmail(Service, { email: null })).toThrow(
        AccEmailInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountEmail(Service, { email: 423 })).toThrow(
        AccEmailInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountEmail(Service, { email: () => 323 })).toThrow(
        AccEmailInvalid
      )
      //
      expect(() =>
        // @ts-expect-error checking failing functionality
        validateAccountEmail(Service, { email: () => '423' })
      ).toThrow(AccEmailInvalid)
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountEmail(Service, { email: true })).toThrow(
        AccEmailInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountEmail(Service, { email: false })).toThrow(
        AccEmailInvalid
      )
      //
    })

    it('throws when `email` is the wrong length', () => {
      expect(() =>
        validateAccountEmail(Service, {
          email: '',
        })
      ).toThrow(AccEmailLength)
      expect(() =>
        validateAccountEmail(Service, {
          email:
            '444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444',
        })
      ).toThrow(AccEmailLength)
    })

    it('throws when `email` contains reserved characters', () => {
      expect(() =>
        validateAccountEmail(Service, { email: 'foobar$@example.com' })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'fodad#fa2$17sdf(fa|fa!d@example.com',
        })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, { email: "fodad'obar@example.com" })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, { email: 'fodad"obar@example.com' })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'fo a href adwk@example.com',
        })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'fodadconsole.log("obar");@example.com',
        })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'foda_adwk@ex_ample.com',
        })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'fo..da_adwk@example.com',
        })
      ).toThrow(AccEmailReserved)
      //
      expect(() =>
        validateAccountEmail(Service, {
          email: 'fo< a href >adwk@example.com',
        })
      ).toThrow(AccEmailReserved)
    })
  })
})
