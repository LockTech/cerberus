import { render } from '@redwoodjs/testing'

import ColorModeLayout from './ColorModeLayout'

describe('ColorModeLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ColorModeLayout />)
    }).not.toThrow()
  })
})
