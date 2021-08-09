import {
  FunctionHeaderMediaType,
  FunctionHeaderMediaTypeKey,
} from 'src/constants/function'
import { validateHTTPMethod, validateJSONBody } from './function'

const BodyInvalid = {
  name: 'ValidationError',
  message: 'function-body-invalid',
}
const MediaTypeInvalid = {
  name: 'ValidationError',
  message: 'function-mediatype-invalid',
}
//
const MethodInvalid = {
  name: 'ValidationError',
  message: 'function-method-invalid',
}

const Service = 'foo'

describe('function validator', () => {
  /* eslint-disable prettier/prettier */
  describe('validateJSONBody', () => {
    it('throws when `body` is defined and not a string', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateJSONBody(Service, { body: 1 })).toThrow(BodyInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateJSONBody(Service, { body: true })).toThrow(BodyInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateJSONBody(Service, { body: false })).toThrow(BodyInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateJSONBody(Service, { body: () => 1 })).toThrow(BodyInvalid)
    })

    it(`throws when \`headers\` does not have ${FunctionHeaderMediaTypeKey} defined`, () => {
      expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': undefined } })
      ).toThrow(MediaTypeInvalid)
      expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': null } })
      ).toThrow(MediaTypeInvalid)
    })

    it(`throws when \`headers\` does not have ${FunctionHeaderMediaTypeKey} set to ${FunctionHeaderMediaType}`, () => {
      expect(
         // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': false } })
      ).toThrow(MediaTypeInvalid)
      expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': 4 } })
      ).toThrow(MediaTypeInvalid)
      expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': () => 4 } })
      ).toThrow(MediaTypeInvalid)
        expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': '' } })
      ).toThrow(MediaTypeInvalid)
      expect(
        // @ts-expect-error checking failing functionality
        () => validateJSONBody(Service, { body: '', headers: { 'content-type': 'foo' } })
      ).toThrow(MediaTypeInvalid)
    })
  })

  describe('validateHTTPMethod', () => {
    it('throws when `httpMethod` is not a valid value', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: false })).toThrow(MethodInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 4 })).toThrow(MethodInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: () => 3 })).toThrow(MethodInvalid)
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 'FOO' })).toThrow(MethodInvalid)
    })

    it('DOES NOT throw when `httpMethod` equals "DELETE"', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 'DELETE' })).not.toThrow(MethodInvalid)
    })

    it('DOES NOT throw when `httpMethod` equals "GET"', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 'GET' })).not.toThrow(MethodInvalid)
    })

    it('DOES NOT throw when `httpMethod` equals "POST"', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 'POST' })).not.toThrow(MethodInvalid)
    })

    it('DOES NOT throw when `httpMethod` equals "PUT"', () => {
      // @ts-expect-error checking failing functionality
      expect(() => validateHTTPMethod(Service, { httpMethod: 'PUT' })).not.toThrow(MethodInvalid)
    })
  })
  /* eslint-enable prettier/prettier */
})
