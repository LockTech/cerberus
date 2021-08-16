import {
  validatePermissionAccessRel,
  validatePermissionId,
  validatePermissionTuple,
} from './permission'

const Invalid = {
  name: 'ValidationError',
  message: 'permission-tuple-invalid',
}
const AccessRelInvalid = {
  name: 'ValidationError',
  message: 'permission-accessRelation-invalid',
}
const IdInvalid = {
  name: 'ValidationError',
  message: 'permission-id-invalid',
}

const Service = 'Foo'

describe('permission validator', () => {
  describe('validatePermissionTuple', () => {
    it('throws when provided an invalid permission tuple', () => {
      // These tests are intentionally lacking; only testing
      // that the validator throws the expected error.
      expect(() =>
        validatePermissionTuple(Service, {
          application: '',
          namespace: 'foo',
          object: 'bar',
          relation: 'baz',
        })
      ).toThrow(Invalid)
    })
  })

  /* eslint-disable prettier/prettier */
  describe('validatePermissionId', () => {
    it('throws when `id` is not a valid uuid', () => {
      expect(() => validatePermissionId(Service, { id: undefined })).toThrow(IdInvalid)
      expect(() => validatePermissionId(Service, { id: null })).toThrow(IdInvalid)
      expect(() => validatePermissionId(Service, { id: '12' })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionId(Service, { id: 42 })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionId(Service, { id: true })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionId(Service, { id: false })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionId(Service, { id: () => '29' })).toThrow(IdInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionId(Service, { id: () => 42 })).toThrow(IdInvalid)
    })
  })

  describe('validatePermissionAccessRel', () => {
    it('throws when `access_relation` is defined and not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionAccessRel(Service, { access_relation: 1 })).toThrow(AccessRelInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionAccessRel(Service, { access_relation: () => '11' })).toThrow(AccessRelInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validatePermissionAccessRel(Service, { access_relation: false })).toThrow(AccessRelInvalid)
    })

    it('DOES NOT throw when `access_relation` is undefined', () => {
      expect(() => validatePermissionAccessRel(Service, { access_relation: undefined })).not.toThrow()
      expect(() => validatePermissionAccessRel(Service, { access_relation: null })).not.toThrow()
    })
  })
  /* eslint-enable prettier/prettier */
})
