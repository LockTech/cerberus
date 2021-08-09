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

//
const id = '8dcf1ebf-cb28-4a09-8265-21a50946a50b'
const name = 'John Doe'
const organizationId = '99eb8558-b92a-4337-86d4-dcb885713e51'
//

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
      mockCurrentUser({ name, organizationId, id: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: null })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: '' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: '1' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: true })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: false })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: false })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: () => '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ name, organizationId, id: '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthIDError)
      //
    })
  })
  describe('name', () => {
    it('throws when `context.currentUser.name` is not a string', () => {
      mockCurrentUser({ id, organizationId, name: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ id, organizationId, name: null })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ id, organizationId, name: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ id, organizationId, name: () => 4 })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ id, organizationId, name: true })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ id, organizationId, name: false })
      expect(() => validateAuth(Service)).toThrow(AuthNameInvalidError)
    })
    it('throws when `context.currentUser.name` is 0 characters long', () => {
      mockCurrentUser({ id, organizationId, name: '' })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
    })
    it(`throws when \`context.currentUser.name\` is greater than ${AccountNameMaxLength} characters long`, () => {
      mockCurrentUser({
        id,
        organizationId,
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabweraweraweras',
      })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
      //
      mockCurrentUser({
        id,
        organizationId,
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabwerawera',
      })
      expect(() => validateAuth(Service)).toThrow(AuthNameLenError)
    })
  })
  describe('organization', () => {
    it('throws when `context.currentUser.organizationId` is an invalid UUID', () => {
      mockCurrentUser({ id, name, organizationId: undefined })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: null })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: '' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: '1' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: 1 })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: true })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: false })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: false })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: () => '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ id, name, organizationId: '2342332424' })
      expect(() => validateAuth(Service)).toThrow(AuthOrgInvalidError)
      //
    })
  })
})
