export const sendMail = jest.fn()
export const templateFileSendMail = jest.fn()
export const sendInviteEmail = jest.fn()
export const sendSignupEmail = jest.fn()

beforeEach(() => {
  sendMail.mockClear()
  templateFileSendMail.mockClear()
  sendInviteEmail.mockClear()
  sendSignupEmail.mockClear()
})
