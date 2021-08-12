export const createPermission = jest.fn()
export const permission = jest.fn()
export const permissions = jest.fn()

beforeEach(() => {
  createPermission.mockClear()
  permission.mockClear()
  permissions.mockClear()
})
