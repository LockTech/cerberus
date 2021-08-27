import { AccountNameMaxLength } from 'src/constants/account'

import { randomStr } from 'src/util/randomStr'

import {
  validateCurrentUser,
  validateAuthId,
  validateAuthName,
  validateAuthOrganization,
  validateAuthVerified,
  validateAuthDisabled,
} from './auth'

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
const AuthVerifiedError = {
  name: 'ValidationError',
  message: 'auth-verified',
}
//
const AuthDisabledError = {
  name: 'ValidationError',
  message: 'auth-disabled',
}

const Service = 'Foo'

/* eslint-disable prettier/prettier */
describe('auth validator', () => {
  describe('currentUser', () => {
    it('throws when `context.currentUser` is undefined', () => {
      mockCurrentUser(undefined)
      expect(() => validateCurrentUser(Service)).toThrow(AuthUndefinedError)
    })
    it('throws when `context.currentUser` is null', () => {
      mockCurrentUser(null)
      expect(() => validateCurrentUser(Service)).toThrow(AuthUndefinedError)
    })
  })
  describe('id', () => {
    it('throws when `context.currentUser.id` is an invalid UUID', () => {
      mockCurrentUser({ id: undefined })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: null })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '' })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '1' })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: 1 })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: true })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: false })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: () => '2342332424' })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
      mockCurrentUser({ id: '2342332424' })
      expect(() => validateAuthId(Service)).toThrow(AuthIDError)
      //
    })
  })
  describe('name', () => {
    it('throws when `context.currentUser.name` is not a string', () => {
      mockCurrentUser({ name: undefined })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: null })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: 1 })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: () => 4 })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: true })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
      //
      mockCurrentUser({ name: false })
      expect(() => validateAuthName(Service)).toThrow(AuthNameInvalidError)
    })
    it('throws when `context.currentUser.name` is 0 characters long', () => {
      mockCurrentUser({ name: '' })
      expect(() => validateAuthName(Service)).toThrow(AuthNameLenError)
    })
    it(`throws when \`context.currentUser.name\` is greater than ${AccountNameMaxLength} characters long`, () => {
      mockCurrentUser({
        name: randomStr(AccountNameMaxLength) + 10,
      })
      expect(() => validateAuthName(Service)).toThrow(AuthNameLenError)
    })
  })
  describe('organization', () => {
    it('throws when `context.currentUser.organizationId` is an invalid UUID', () => {
      mockCurrentUser({ organizationId: undefined })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: null })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '' })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '1' })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: 1 })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: true })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: false })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: () => '2342332424' })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
      mockCurrentUser({ organizationId: '2342332424' })
      expect(() => validateAuthOrganization(Service)).toThrow(AuthOrgInvalidError)
      //
    })
  })
  describe('verified', () => {
    it('throws when `context.currentUser.verified` is undefined', () => {
      mockCurrentUser({ verified: undefined })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
      mockCurrentUser({ verified: null })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
    })
    it('throws when `context.currentUser.verified` is not a "boolean"', () => {
      mockCurrentUser({ verified: 3 })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
      mockCurrentUser({ verified: '23' })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
      mockCurrentUser({ verified: () => 4 })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
      mockCurrentUser({ verified: () => '4' })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
      mockCurrentUser({ verified: () => true })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
    })
    it('throws when `context.currentUser.verified` is "false"', () => {
      mockCurrentUser({ verified: false })
      expect(() => validateAuthVerified(Service)).toThrow(AuthVerifiedError)
      //
    })
    it('DOES NOT throw when `context.currentUser.verified` is "true"', () => {
      mockCurrentUser({ verified: true })
      expect(() => validateAuthVerified(Service)).not.toThrow(AuthVerifiedError)
      //
    })
  })
  describe('disabled', () => {
    it('throws when `context.currentUser.disabled` is undefined', () => {
      mockCurrentUser({ disabled: undefined })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
      mockCurrentUser({ disabled: null })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
    })
    it('throws when `context.currentUser.disabled` is not a "boolean"', () => {
      mockCurrentUser({ disabled: 3 })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
      mockCurrentUser({ disabled: '23' })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
      mockCurrentUser({ disabled: () => 4 })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
      mockCurrentUser({ disabled: () => '4' })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
      mockCurrentUser({ disabled: () => true })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
    })
    it('throws when `context.currentUser.disabled` is "true"', () => {
      mockCurrentUser({ disabled: true })
      expect(() => validateAuthDisabled(Service)).toThrow(AuthDisabledError)
      //
    })
    it('DOES NOT throw when `context.currentUser.disabled` is "false"', () => {
      mockCurrentUser({ disabled: false })
      expect(() => validateAuthDisabled(Service)).not.toThrow(AuthDisabledError)
      //
    })
  })
})
/* eslint-enable prettier/prettier */
