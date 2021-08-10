import { RoleMaxNameLength } from 'src/constants/role'

import { randomStr } from 'src/util/randomStr'

import { validateRoleId, validateRoleName } from './role'

const IdInvalid = {
  name: 'ValidationError',
  message: 'role-id-invalid',
}
//
const NameInvalid = {
  name: 'ValidationError',
  message: 'role-name-invalid',
}
const NameLength = {
  name: 'ValidationError',
  message: 'role-name-length',
}

const Service = 'Foo'

/* eslint-disable prettier/prettier */
describe('role validator', () => {
  describe('validateRoleId', () => {
    it('throws when `id` is not a valid UUID', () => {
      expect(() => validateRoleId(Service, { id: undefined })).toThrow(IdInvalid)
      expect(() => validateRoleId(Service, { id: null })).toThrow(IdInvalid)
      expect(() => validateRoleId(Service, { id: '1' })).toThrow(IdInvalid)
      expect(() => validateRoleId(Service, { id: 'ac32-234' })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleId(Service, { id: 0 })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleId(Service, { id: false })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleId(Service, { id: () => 4 })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleId(Service, { id: { id: 1 } })).toThrow(IdInvalid)
    })
  })

  describe('validateRoleName', () => {
    it('throws when `name` is not a string', () => {
      expect(() => validateRoleName(Service, { name: undefined })).toThrow(NameInvalid)
      expect(() => validateRoleName(Service, { name: null })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleName(Service, { name: 1 })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleName(Service, { name: () => 1 })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleName(Service, { name: () => '4' })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateRoleName(Service, { name: { name: 1 } })).toThrow(NameInvalid)
    })

    it('throws when `name` is 0 characters long', () => {
      expect(() => validateRoleName(Service, { name: '' })).toThrow(NameLength)
    })

    it(`throws when \`name\` is greater than ${RoleMaxNameLength} characters long`, () => {
      expect(
        () => validateRoleName(Service, {
          name: randomStr(RoleMaxNameLength + 10)
        })
      ).toThrow(NameLength)
    })
  })
})
