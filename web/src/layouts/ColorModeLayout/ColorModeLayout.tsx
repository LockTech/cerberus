import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ColorModeAtom } from 'src/context/ColorMode'

type ColorModeLayoutProps = {
  children: React.ReactNode
}

const ColorModeLayout = ({ children }: ColorModeLayoutProps) => {
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onChangePreference = useCallback(
    (e) =>
      e.matches
        ? document.body.classList.add('dark')
        : document.body.classList.remove('dark'),
    []
  )

  const delChangePreference = useCallback(
    () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onChangePreference),
    [onChangePreference]
  )

  useEffect(() => {
    switch (colorMode) {
      case 'browser': {
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? document.body.classList.add('dark')
          : document.body.classList.remove('dark')

        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', onChangePreference)
        break
      }
      case 'light': {
        document.body.classList.remove('dark')
        delChangePreference()
        break
      }
      case 'night': {
        document.body.classList.add('dark')
        delChangePreference()
        break
      }
    }

    return delChangePreference()
  }, [colorMode, delChangePreference, onChangePreference, setColorMode])

  return <>{children}</>
}

export default ColorModeLayout
