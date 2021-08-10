import { validatePermissionTuple } from './permission'

const Invalid = {
  name: 'ValidationError',
  message: 'permission-tuple-invalid',
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
})
