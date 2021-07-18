import { render } from '@redwoodjs/testing'

import AuthLayout from './AuthLayout'

describe('AuthLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthLayout />)
    }).not.toThrow()
  })
})
