import {
  validateAccountId,
  validateAccountName,
  validateAccountOrganization,
  validateCurrentUser,
} from './account'

const ServiceName = 'foo'

const AuthError: Error = {
  name: 'ValidationError',
  message: 'authentication',
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
  it('throws if organizationId cannot be validated', () => {
    expect(() => validateAccountOrganization(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'invalid-organizationId',
    })
    mockCurrentUser({ organizationId: '1' })
    expect(() => validateAccountOrganization(ServiceName)).not.toThrow()
  })
  it('throws if ID cannot be validated', () => {
    expect(() => validateAccountId(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'invalid-accountId',
    })
    mockCurrentUser({ id: '1' })
    expect(() => validateAccountId(ServiceName)).not.toThrow()
  })
  it('throws if accountName cannot be validated', () => {
    expect(() => validateAccountName(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'invalid-accountName',
    })
    mockCurrentUser({ firstName: 'John', lastName: 'Doe' })
    expect(() => validateAccountName(ServiceName)).not.toThrow()
  })
})
