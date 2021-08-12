export const createOrganization = jest.fn()
export const organization = jest.fn()
export const updateOrganization = jest.fn()
export const deleteOrganization = jest.fn()

beforeEach(() => {
  createOrganization.mockClear()
  organization.mockClear()
  updateOrganization.mockClear()
  deleteOrganization.mockClear()
})
