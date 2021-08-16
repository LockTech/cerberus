import { atom } from 'recoil'

export interface SignupData {
  username: string
  password: string
  redirect?: string
}

export const SignupDataAtom = atom<SignupData>({
  key: 'SignupData',
  default: undefined,
})
