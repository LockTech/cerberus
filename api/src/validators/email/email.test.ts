import { validateEmail } from './email'

const ServiceName = 'foo'

const RequiredError: Error = {
  name: 'ValidationError',
  message: 'required',
}

const InvalidError: Error = {
  name: 'ValidationError',
  message: 'invalid',
}

const LengthError: Error = {
  name: 'ValidationError',
  message: 'length',
}

const CharacterError: Error = {
  name: 'ValidationError',
  message: 'reserved',
}

describe('email validator', () => {
  it('throws when email is not provided', () => {
    expect(() =>
      validateEmail(ServiceName, { input: { email: undefined } })
    ).toThrow(RequiredError)
    expect(() =>
      validateEmail(ServiceName, { input: { email: null } })
    ).toThrow(RequiredError)
  })

  it('throws when email is not a string', () => {
    /// @ts-expect-error checking failing functionality
    expect(() => validateEmail(ServiceName, { input: { email: 42 } })).toThrow(
      InvalidError
    )
    expect(() =>
      /// @ts-expect-error checking failing functionality
      validateEmail(ServiceName, { input: { email: false } })
    ).toThrow(InvalidError)
    expect(() =>
      /// @ts-expect-error checking failing functionality
      validateEmail(ServiceName, { input: { email: () => 421 } })
    ).toThrow(InvalidError)
    expect(() =>
      /// @ts-expect-error checking failing functionality
      validateEmail(ServiceName, { input: { email: 423.22 } })
    ).toThrow(InvalidError)
  })

  it('throws when email is longer than 254 characters', () => {
    expect(() =>
      validateEmail(ServiceName, {
        input: {
          email:
            '444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444',
        },
      })
    ).toThrow(LengthError)
  })

  it('throws when email contains reserved characters', () => {
    expect(() =>
      validateEmail(ServiceName, { input: { email: 'foobar$@example.com' } })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, {
        input: { email: 'fodad#fa2$17sdf(fa|fa!d@example.com' },
      })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, { input: { email: "fodad'obar@example.com" } })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, { input: { email: 'fodad"obar@example.com' } })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, {
        input: { email: 'fodadconsole.log("obar");@example.com' },
      })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, {
        input: { email: 'foda_adwk@ex_ample.com' },
      })
    ).toThrow(CharacterError)
    expect(() =>
      validateEmail(ServiceName, {
        input: { email: 'fo..da_adwk@example.com' },
      })
    ).toThrow(CharacterError)
  })
})
