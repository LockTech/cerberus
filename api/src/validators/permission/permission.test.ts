import { validatePermissionId, validatePermissionTuple } from './permission'

const Invalid = {
  name: 'ValidationError',
  message: 'permission-tuple-invalid',
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
  /* eslint-enable prettier/prettier */
})
