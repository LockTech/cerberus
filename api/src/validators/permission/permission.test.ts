import { isPermissionTuple, IsPermissionTupleArgs } from './permission'

const Tuple: IsPermissionTupleArgs = {
  application: 'hello',
  namespace: 'im',
  object: 'a',
  relation: 'tuple',
}

describe('permission validator', () => {
  describe('isPermissionTuple', () => {
    // application
    it('returns "false" when "application" is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, application: 0 })).toBeFalsy()
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, application: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, application: null })).toBeFalsy()
    })
    it('returns "false" when "application" is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, application: '' })).toBeFalsy()
    })
    // namespace
    it('returns "false" when "namespace" is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, namespace: 0 })).toBeFalsy()
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, namespace: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, namespace: null })).toBeFalsy()
    })
    it('returns "false" when "namespace" is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, namespace: '' })).toBeFalsy()
    })
    // object
    it('returns "false" when "object" is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, object: 0 })).toBeFalsy()
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, object: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, object: null })).toBeFalsy()
    })
    it('returns "false" when "object" is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, object: '' })).toBeFalsy()
    })
    // relation
    it('returns "false" when "relation" is not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(isPermissionTuple({ ...Tuple, relation: 0 })).toBeFalsy()
      // eslint-disable-next-line prettier/prettier
      expect(isPermissionTuple({ ...Tuple, relation: undefined })).toBeFalsy()
      expect(isPermissionTuple({ ...Tuple, relation: null })).toBeFalsy()
    })
    it('returns "false" when "relation" is an empty string', () => {
      expect(isPermissionTuple({ ...Tuple, relation: '' })).toBeFalsy()
    })
  })
})
