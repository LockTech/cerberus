import type { PermissionTuple } from 'src/constants/permission'

import { isPermissionTuple } from './asserters'

const Tuple: PermissionTuple = {
  application: 'hello',
  namespace: 'im',
  object: 'a',
  relation: 'tuple',
}

describe('asserter util', () => {
  describe('isPermissionTuple', () => {
    // application
    it('returns "false" when `application` is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, application: 0 })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, application: true })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, application: () => 4 })).toBeFalsy()
    })
    it('returns false when `application` is undefined or null', () => {
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, application: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, application: null })).toBeFalsy()
    })
    it('returns "false" when `application` is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, application: '' })).toBeFalsy()
    })
    // namespace
    it('returns "false" when `namespace` is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, namespace: 0 })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, namespace: true })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, namespace: () => 4 })).toBeFalsy()
    })
    it('returns false when `namespace` is undefined or null', () => {
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, namespace: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, namespace: null })).toBeFalsy()
    })
    it('returns "false" when `namespace` is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, namespace: '' })).toBeFalsy()
    })
    // object
    it('returns "false" when `object` is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, object: 0 })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, object: true })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, object: () => 4 })).toBeFalsy()
    })
    it('returns "true" when `object` is undefined', () => {
      expect(isPermissionTuple({ ...Tuple, object: undefined })).toBeTruthy()
      expect(isPermissionTuple({ ...Tuple, object: null })).toBeTruthy()
    })
    it('returns "true" when `object` is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, object: '' })).toBeTruthy()
    })
    // relation
    it('returns "false" when `relation` is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, relation: 0 })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, relation: true })).toBeFalsy()
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, relation: () => 4 })).toBeFalsy()
    })
    it('returns "true" when `relation` is undefined', () => {
      expect(isPermissionTuple({ ...Tuple, relation: undefined })).toBeTruthy()
      expect(isPermissionTuple({ ...Tuple, relation: null })).toBeTruthy()
    })
    it('returns "true" when `relation` is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, relation: '' })).toBeTruthy()
    })
  })
})
