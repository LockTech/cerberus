export const writeTuple = jest.fn()
export const checkTuple = jest.fn()
export const deleteTuple = jest.fn()

beforeEach(() => {
  writeTuple.mockClear()
  checkTuple.mockClear()
  deleteTuple.mockClear()
})
