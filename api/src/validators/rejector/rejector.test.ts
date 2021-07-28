import { reject } from './rejector'

describe('account service', () => {
  it('throws a rejection error', () => {
    expect(reject()).toThrow({
      name: 'AuthenticationError',
      message: 'rejected',
    })
  })
})