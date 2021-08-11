import { CheckURL, DeleteURL, WriteURL } from 'src/constants/keto'

import { fetch } from 'src/util/fetch'

import { checkTuple, deleteTuple, handleKetoError, writeTuple } from './keto'

jest.mock('../../util/fetch')
const mockedFetch = fetch as jest.Mocked<typeof fetch>

const KetoError = {
  name: 'UserInputError',
  message: 'keto-error',
}

const tuple = {
  namespace: 'foo',
  object: 'foo',
  relation: 'foo',
  subject: 'foo',
}
const Error = {
  ok: false,
  res: undefined,
  status: 500,
  statusText: 'Internal error',
}
const ErrorResponse = {
  ok: false,
  res: tuple,
  status: 500,
  statusText: 'internal server error',
}
const OkResponse = {
  ok: true,
  res: tuple,
  status: 200,
  statusText: 'success',
}
const AllowedResponse = {
  ok: true,
  res: { allowed: true },
  status: 200,
  statusText: 'success',
}
const NotAllowedResponse = {
  ok: true,
  res: { allowed: false },
  status: 200,
  statusText: 'success',
}
const NullResponse = {
  ok: true,
  res: null,
  status: 200,
  statusText: 'success',
}

describe('keto helper', () => {
  beforeEach(() => {
    mockedFetch.DELETE.mockClear()
    mockedFetch.GET.mockClear()
    mockedFetch.POST.mockClear()
    mockedFetch.PUT.mockClear()
  })

  describe('handleKetoError', () => {
    it('detects when a response is not "ok"', () => {
      expect(() => handleKetoError(Error)).toThrow(KetoError)
    })
  })

  describe('writeTuple', () => {
    it('returns the created tuple after completion', async () => {
      mockedFetch.PUT.mockResolvedValue(OkResponse)

      const res = await writeTuple(tuple)

      expect(res).toBe(tuple)
    })

    it('throws when a Keto error is detected', () => {
      mockedFetch.PUT.mockResolvedValue(ErrorResponse)

      expect(writeTuple(tuple)).rejects.toThrow(KetoError)
    })

    it('calls the `PUT` endpoint once', async () => {
      mockedFetch.PUT.mockResolvedValue(OkResponse)

      await writeTuple(tuple)

      expect(mockedFetch.PUT).toHaveBeenCalledTimes(1)
    })

    it('makes a request against the correct endpoint', async () => {
      mockedFetch.PUT.mockResolvedValue(OkResponse)

      await writeTuple(tuple)

      expect(mockedFetch.PUT).toHaveBeenCalledWith(WriteURL, tuple)
    })
  })

  describe('checkTuple', () => {
    it('returns `true` when the check resolves to "allowed"', async () => {
      mockedFetch.POST.mockResolvedValue(AllowedResponse)

      const res = await checkTuple(tuple)

      expect(res).toBeTruthy()
    })

    it('returns `false` when the check resolves to "not-allowed"', async () => {
      mockedFetch.POST.mockResolvedValue(NotAllowedResponse)

      const res = await checkTuple(tuple)

      expect(res).toBeFalsy()
    })

    it('throws when a Keto error is detected', () => {
      mockedFetch.PUT.mockResolvedValue(ErrorResponse)

      expect(writeTuple(tuple)).rejects.toThrow(KetoError)
    })

    it('calls the `POST` endpoint once', async () => {
      mockedFetch.POST.mockResolvedValue(AllowedResponse)

      await checkTuple(tuple)

      expect(mockedFetch.POST).toHaveBeenCalledTimes(1)
    })

    it('makes a request against the correct endpoint', async () => {
      mockedFetch.POST.mockResolvedValue(AllowedResponse)

      await checkTuple(tuple)

      expect(mockedFetch.POST).toHaveBeenCalledWith(CheckURL, tuple)
    })
  })

  describe('deleteTuple', () => {
    it('returns `null` after completion', async () => {
      mockedFetch.DELETE.mockResolvedValue(NullResponse)

      const res = await deleteTuple(tuple)

      expect(res).toBeNull()
    })

    it('throws when a Keto error is detected', () => {
      mockedFetch.PUT.mockResolvedValue(ErrorResponse)

      expect(writeTuple(tuple)).rejects.toThrow(KetoError)
    })

    it('calls the `DELETE` endpoint once', async () => {
      mockedFetch.DELETE.mockResolvedValue(NullResponse)

      await deleteTuple(tuple)

      expect(mockedFetch.DELETE).toHaveBeenCalledTimes(1)
    })

    it('makes a request against the correct endpoint', async () => {
      mockedFetch.DELETE.mockResolvedValue(NullResponse)

      await deleteTuple(tuple)

      const { namespace, object, relation, subject } = tuple

      expect(mockedFetch.DELETE).toHaveBeenCalledWith(
        `${DeleteURL}?namespace=${namespace}&object=${object}&relation=${relation}&subject=${subject}`
      )
    })
  })
})
