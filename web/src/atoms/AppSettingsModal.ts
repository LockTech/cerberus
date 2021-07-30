import { atom } from 'recoil'

export const AppSettingsModalAtom = atom<boolean>({
  key: 'AppSettingsModal',
  default: false,
})
