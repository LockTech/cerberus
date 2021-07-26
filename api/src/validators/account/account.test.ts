import {
  validateAccountId,
  validateAccountOrganization,
  validateCurrentUser,
} from './account'

const ServiceName = 'foo'

const AuthError: Error = {
  name: 'ValidationError',
  message: 'authentication',
}

const ExistError: Error = {
  name: 'ValidationError',
  message: 'exist',
}

describe('account validator', () => {
  it("throws if current request's user is undefined", () => {
    mockCurrentUser(undefined)

    expect(() => {
      validateCurrentUser(ServiceName)
    }).toThrow(AuthError)
  })
  it("throws if current current request's user is null", () => {
    mockCurrentUser(null)

    expect(() => {
      validateCurrentUser(ServiceName)
    }).toThrow(AuthError)
  })
  it("throws if organizationId cannot be found on the request's current context", () => {
    expect(() => validateAccountOrganization(ServiceName)).toThrow(ExistError)
    mockCurrentUser({ organizationId: '1' })
    expect(() => validateAccountOrganization(ServiceName)).not.toThrow()
  })
  it("throws if ID cannot be found on the request's current context", () => {
    expect(() => validateAccountId(ServiceName)).toThrow(ExistError)
    mockCurrentUser({ id: '1' })
    expect(() => validateAccountId(ServiceName)).not.toThrow()
  })
})
