import { AccountNameMaxLength } from 'src/constants/account'

import {
  validateUser,
  validateUserID,
  validateUserName,
  validateUserOrg,
} from './user'

const Service = 'Foo'

const UserUndefinedError = {
  name: 'ValidationError',
  message: 'user-undefined',
}
//
const UserIDError = {
  name: 'ValidationError',
  message: 'user-id-invalid',
}
//
const UserNameInvalidError = {
  name: 'ValidationError',
  message: 'user-name-invalid',
}
const UserNameLenError = {
  name: 'ValidationError',
  message: 'user-name-length',
}
//
const UserOrgInvalidError = {
  name: 'ValidationError',
  message: 'user-organization-invalid',
}

describe('user validator', () => {
  describe('user', () => {
    it('throws when `context.currentUser` is undefined', () => {
      mockCurrentUser(undefined)
      expect(() => validateUser(Service)).toThrow(UserUndefinedError)
    })
    it('throws when `context.currentUser` is null', () => {
      mockCurrentUser(null)
      expect(() => validateUser(Service)).toThrow(UserUndefinedError)
    })
  })
  describe('user id', () => {
    it('throws when `context.currentUser.id` is an invalid UUID', () => {
      mockCurrentUser({ id: undefined })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: null })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: '' })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: '1' })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: 1 })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: true })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: () => '2342332424' })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
      mockCurrentUser({ id: '2342332424' })
      expect(() => validateUserID(Service)).toThrow(UserIDError)
      //
    })
  })
  describe('user name', () => {
    it('throws when `context.currentUser.name` is not a string', () => {
      mockCurrentUser({ name: undefined })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
      //
      mockCurrentUser({ name: null })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
      //
      mockCurrentUser({ name: 1 })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
      //
      mockCurrentUser({ name: () => 4 })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
      //
      mockCurrentUser({ name: true })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
      //
      mockCurrentUser({ name: false })
      expect(() => validateUserName(Service)).toThrow(UserNameInvalidError)
    })
    it('throws when `context.currentUser.name` is 0 characters long', () => {
      mockCurrentUser({ name: '' })
      expect(() => validateUserName(Service)).toThrow(UserNameLenError)
    })
    it(`throws when \`context.currentUser.name\` is greater than ${AccountNameMaxLength} characters long`, () => {
      mockCurrentUser({
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabweraweraweras',
      })
      expect(() => validateUserName(Service)).toThrow(UserNameLenError)
      //
      mockCurrentUser({
        name: 'asdadawawdawdawdawdawdAwbdawdaawefsfesefesbesefbasefabwerawerabwerawera',
      })
      expect(() => validateUserName(Service)).toThrow(UserNameLenError)
    })
  })
  describe('user organization', () => {
    it('throws when `context.currentUser.organizationId` is an invalid UUID', () => {
      mockCurrentUser({ organizationId: undefined })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: null })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '' })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '1' })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: 1 })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: true })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: () => '2342332424' })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '2342332424' })
      expect(() => validateUserOrg(Service)).toThrow(UserOrgInvalidError)
      //
    })
  })
})
