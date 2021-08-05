import {
  validateAccountId,
  validateAccountName,
  validateAccountOrganization,
  validateCurrentUser,
} from './account'

describe('account validator', () => {
  it("throws if current request's user is undefined", () => {
    mockCurrentUser(undefined)
    expect(() => validateCurrentUser()).toThrow({
      name: 'ValidationError',
      message: 'account-invalid',
    })

    mockCurrentUser({})
    expect(() => validateCurrentUser()).not.toThrow()
  })
  it("throws if current current request's user is null", () => {
    mockCurrentUser(undefined)
    expect(() => validateCurrentUser()).toThrow({
      name: 'ValidationError',
      message: 'account-invalid',
    })

    mockCurrentUser({ id: 'Hey look, an ID' })
    expect(() => validateCurrentUser()).not.toThrow()
  })
  it('throws if organizationId cannot be validated', () => {
    expect(() => validateAccountOrganization()).toThrow({
      name: 'ValidationError',
      message: 'account-organizationId-invalid',
    })
    mockCurrentUser({ organizationId: '1' })
    expect(() => validateAccountOrganization()).not.toThrow()
  })
  it('throws if ID cannot be validated', () => {
    expect(() => validateAccountId()).toThrow({
      name: 'ValidationError',
      message: 'account-id-invalid',
    })
    mockCurrentUser({ id: '1' })
    expect(() => validateAccountId()).not.toThrow()
  })
  it('throws if accountName cannot be validated', () => {
    expect(() => validateAccountName()).toThrow({
      name: 'ValidationError',
      message: 'account-name-invalid',
    })
    mockCurrentUser({ name: 'John Doe' })
    expect(() => validateAccountName()).not.toThrow()
  })
})
