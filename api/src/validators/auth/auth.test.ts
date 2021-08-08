import { AccountNameMaxLength } from 'src/constants/account'

import { validateAuth } from './auth'

const Service = 'Foo'

const AuthUndefinedError = {
  name: 'ValidationError',
  message: 'auth-undefined',
}
//
const AuthIDError = {
  name: 'ValidationError',
  message: 'auth-id-invalid',
}
//
const AuthNameInvalidError = {
  name: 'ValidationError',
  message: 'auth-name-invalid',
}
const AuthNameLenError = {
  name: 'ValidationError',
  message: 'auth-name-length',
}
//
const AuthOrgInvalidError = {
  name: 'ValidationError',
  message: 'auth-organization-invalid',
}

describe('auth validator', () => {
  describe('currentUser', () => {
    it('throws when `context.currentUser` is undefined', () => {
      mockCurrentUser(undefined)
      expect(() => validateAuth(Service)).toThrow(AuthUndefinedError)
    })
    it('throws when `context.currentUser` is null', () => {
      mockCurrentUser(null)
      expect(() => validateAuth(Service)).toThrow(AuthUndefinedError)
    })
  })
  describe('id', () => {
    it('throws when `context.currentUser.id` is an invalid UUID', () => {
      mockCurrentUser({ id: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: null })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '1' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: true })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: () => '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
    })
  })
  describe('name', () => {
    it('throws when `context.currentUser.name` is not a string', () => {
      mockCurrentUser({ name: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: null })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: () => 4 })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: true })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: false })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
    })
    it('throws when `context.currentUser.name` is 0 characters long', () => {
      mockCurrentUser({ name: '' })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
    })
    it(`throws when \`context.currentUser.name\` is greater than ${AccountNameMaxLength} characters long`, () => {
      mockCurrentUser({
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabweraweraweras',
      })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
      //
      mockCurrentUser({
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabwerawera',
      })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
    })
  })
  describe('organization', () => {
    it('throws when `context.currentUser.organizationId` is an invalid UUID', () => {
      mockCurrentUser({ organizationId: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: null })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '1' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: true })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: () => '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
    })
  })
})
