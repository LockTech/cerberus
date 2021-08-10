import { reject } from './reject'

const Reject = {
  name: 'ValidationError',
  message: 'rejected',
}

describe('reject validator', () => {
  it('throws an error', () => {
    expect(() => reject()).toThrow(Reject)
  })
})
