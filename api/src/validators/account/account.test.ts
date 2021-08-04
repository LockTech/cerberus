import {
  validateAccountId,
  validateAccountName,
  validateAccountOrganization,
  validateCurrentUser,
} from './account'

const ServiceName = 'foo'

describe('account validator', () => {
  it("throws if current request's user is undefined", () => {
    mockCurrentUser(undefined)
    expect(() => validateCurrentUser(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'account-invalid',
    })

    mockCurrentUser({})
    expect(() => validateCurrentUser(ServiceName)).not.toThrow()
  })
  it("throws if current current request's user is null", () => {
    mockCurrentUser(undefined)
    expect(() => validateCurrentUser(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'account-invalid',
    })

    mockCurrentUser({ id: 'Hey look, an ID' })
    expect(() => validateCurrentUser(ServiceName)).not.toThrow()
  })
  it('throws if organizationId cannot be validated', () => {
    expect(() => validateAccountOrganization(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'account-organizationId-invalid',
    })
    mockCurrentUser({ organizationId: '1' })
    expect(() => validateAccountOrganization(ServiceName)).not.toThrow()
  })
  it('throws if ID cannot be validated', () => {
    expect(() => validateAccountId(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'account-id-invalid',
    })
    mockCurrentUser({ id: '1' })
    expect(() => validateAccountId(ServiceName)).not.toThrow()
  })
  it('throws if accountName cannot be validated', () => {
    expect(() => validateAccountName(ServiceName)).toThrow({
      name: 'ValidationError',
      message: 'account-name-invalid',
    })
    mockCurrentUser({ firstName: 'John', lastName: 'Doe' })
    expect(() => validateAccountName(ServiceName)).not.toThrow()
  })
})
