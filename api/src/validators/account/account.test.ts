import {
  AccountEmailMaxLength,
  AccountNameMaxLength,
} from 'src/constants/account'

import { randomStr } from 'src/util/randomStr'

import {
  validateAccountDisabled,
  validateAccountEmail,
  validateAccountID,
  validateAccountName,
} from './account'

const Service = 'Foo'

const AccDisabledInvalid = {
  name: 'ValidationError',
  message: 'account-disabled-invalid',
}
//
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
//
const AccIDInvalid = {
  name: 'ValidationError',
  message: 'account-id-invalid',
}
//
const AccNameInvalid = {
  name: 'ValidationError',
  message: 'account-name-invalid',
}
const AccNameLength = {
  name: 'ValidationError',
  message: 'account-name-length',
}

describe('account validator', () => {
  describe('account disabled', () => {
    it('throws when `disabled` is not a boolean', () => {
      expect(() =>
        validateAccountDisabled(Service, { disabled: undefined })
      ).toThrow(AccDisabledInvalid)
      expect(() =>
        validateAccountDisabled(Service, { disabled: null })
      ).toThrow(AccDisabledInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountDisabled(Service, { disabled: '' })).toThrow(
        AccDisabledInvalid
      )
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountDisabled(Service, { disabled: 42 })).toThrow(
        AccDisabledInvalid
      )
      expect(() =>
        // @ts-expect-error checking failing functionality
        validateAccountDisabled(Service, { disabled: () => 42 })
      ).toThrow(AccDisabledInvalid)
      expect(() =>
        // @ts-expect-error checking failing functionality
        validateAccountDisabled(Service, { disabled: () => false })
      ).toThrow(AccDisabledInvalid)
      expect(() =>
        validateAccountDisabled(Service, { disabled: true })
      ).not.toThrow()
    })
  })

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

    it('throws when `email` is less than 1 character long', () => {
      expect(() =>
        validateAccountEmail(Service, {
          email: '',
        })
      ).toThrow(AccEmailLength)
    })

    it(`throws when \`email\` is greater than ${AccountEmailMaxLength} characters long`, () => {
      expect(() =>
        validateAccountEmail(Service, {
          email: randomStr(AccountEmailMaxLength + 10),
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

  describe('account id', () => {
    it('throws when `name` is not a valid UUID', () => {
      expect(() => validateAccountID(Service, { id: undefined })).toThrow(
        AccIDInvalid
      )
      //
      expect(() => validateAccountID(Service, { id: null })).toThrow(
        AccIDInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountID(Service, { id: 423 })).toThrow(
        AccIDInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountID(Service, { id: () => 323 })).toThrow(
        AccIDInvalid
      )
      //
      expect(() =>
        // @ts-expect-error checking failing functionality
        validateAccountID(Service, { id: () => '423' })
      ).toThrow(AccIDInvalid)
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountID(Service, { id: true })).toThrow(
        AccIDInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountID(Service, { id: false })).toThrow(
        AccIDInvalid
      )
      //
      expect(() => validateAccountID(Service, { id: '4232' })).toThrow(
        AccIDInvalid
      )
      //
      expect(() => validateAccountID(Service, { id: 'sfs323x' })).toThrow(
        AccIDInvalid
      )
      //
      expect(() => validateAccountID(Service, { id: 'aae322f-a' })).toThrow(
        AccIDInvalid
      )
    })
  })

  describe('account name', () => {
    it('throws when `name` is not a string', () => {
      expect(() => validateAccountName(Service, { name: undefined })).toThrow(
        AccNameInvalid
      )
      //
      expect(() => validateAccountName(Service, { name: null })).toThrow(
        AccNameInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountName(Service, { name: 423 })).toThrow(
        AccNameInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountName(Service, { name: () => 323 })).toThrow(
        AccNameInvalid
      )
      //
      expect(() =>
        // @ts-expect-error checking failing functionality
        validateAccountName(Service, { name: () => '423' })
      ).toThrow(AccNameInvalid)
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountName(Service, { name: true })).toThrow(
        AccNameInvalid
      )
      //
      // @ts-expect-error checking failing functionality
      expect(() => validateAccountName(Service, { name: false })).toThrow(
        AccNameInvalid
      )
      //
    })

    it('throws when `name` is less than 1 character long', () => {
      expect(() =>
        validateAccountName(Service, {
          name: '',
        })
      ).toThrow(AccNameLength)
    })

    it(`throws when \`name\` is greater than ${AccountNameMaxLength} characters long`, () => {
      expect(() =>
        validateAccountName(Service, {
          name: randomStr(AccountNameMaxLength + 10),
        })
      ).toThrow(AccNameLength)
    })
  })
})
