import axios from 'axios'

type UnknownHeaders = Record<string, unknown>
type UnknownBody = unknown

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

class fetch {
  static GET = async <T>(url: string, headers?: UnknownHeaders) =>
    (await axios.get<T>(url, { headers })).data

  static POST = async <T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) => (await axios.post<T>(url, body, { headers })).data

  static PUT = async <T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) => (await axios.put<T>(url, body, { headers })).data

  static DELETE = async <T>(url: string, headers?: UnknownHeaders) =>
    (await axios.delete<T>(url, { headers })).data
}

export { fetch }
