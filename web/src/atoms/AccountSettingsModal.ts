import { atom } from 'recoil'

export const AccountSettingsModalAtom = atom<boolean>({
  key: 'AccountSettingsModal',
  default: false,
})
