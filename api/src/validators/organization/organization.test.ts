import { OrganizationMaxNameLength } from 'src/constants/organization'

import { randomStr } from 'src/util/randomStr'

import {
  validateOrganizationId,
  validateOrganizationName,
} from './organization'

const NameInvalid = {
  name: 'ValidationError',
  message: 'organization-name-invalid',
}
const NameLength = {
  name: 'ValidationError',
  message: 'organization-name-length',
}
//
const IDInvalid = {
  name: 'ValidationError',
  message: 'organization-id-invalid',
}

const Service = 'Foo'

/* eslint-disable prettier/prettier */
describe('organization validator', () => {
  describe('validateOrganizationName', () => {
    it('throws when `name` is not a string', () => {
      expect(() => validateOrganizationName(Service, { name: undefined })).toThrow(NameInvalid)
      expect(() => validateOrganizationName(Service, { name: null })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationName(Service, { name: 1 })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationName(Service, { name: false })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationName(Service, { name: true })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationName(Service, { name: () => 1 })).toThrow(NameInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationName(Service, { name: () => '1' })).toThrow(NameInvalid)
    })

    it('throws when `name` is 0 characters long', () => {
      expect(() => validateOrganizationName(Service, { name: '' })).toThrow(NameLength)
    })

    it(`throws when \`name\` is greater than ${OrganizationMaxNameLength} characters long`, () => {
      expect(() => validateOrganizationName(Service, {
        name: randomStr(OrganizationMaxNameLength + 10)
      })).toThrow(NameLength)
    })
  })

  describe('validateOrganizationId', () => {
    it('throws when `id` is not a valid UUID', () => {
      expect(() => validateOrganizationId(Service, { id: undefined })).toThrow(IDInvalid)
      expect(() => validateOrganizationId(Service, { id: null })).toThrow(IDInvalid)
      expect(() => validateOrganizationId(Service, { id: '1' })).toThrow(IDInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationId(Service, { id: 423 })).toThrow(IDInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationId(Service, { id: () => 23 })).toThrow(IDInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationId(Service, { id: () => '42' })).toThrow(IDInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationId(Service, { id: true })).toThrow(IDInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateOrganizationId(Service, { id: false })).toThrow(IDInvalid)
    })
  })
})
/* eslint-enable prettier/prettier */
