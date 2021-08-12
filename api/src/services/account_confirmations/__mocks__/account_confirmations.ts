export const createInviteConfirm = jest.fn()
export const createSignupConfirm = jest.fn()
export const confirmInvitation = jest.fn()
export const confirmSignup = jest.fn()

beforeEach(() => {
  createInviteConfirm.mockClear()
  createSignupConfirm.mockClear()
  confirmInvitation.mockClear()
  confirmSignup.mockClear()
})
