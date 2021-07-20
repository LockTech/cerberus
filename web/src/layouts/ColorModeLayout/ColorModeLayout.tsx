import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ColorModeAtom } from 'src/atoms/ColorModeAtom'

type ColorModeLayoutProps = {
  children: React.ReactNode
}

// FIXME: remove 'm' keybind below

const ColorModeLayout = ({ children }: ColorModeLayoutProps) => {
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onKeybind = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'm') {
        setColorMode(colorMode === 'light' ? 'night' : 'light')
      }
    },
    [colorMode, setColorMode]
  )

  useEffect(() => {
    colorMode === 'night'
      ? window.document.body.classList.add('dark')
      : window.document.body.classList.remove('dark')
  }, [colorMode])

  useEffect(() => {
    document.addEventListener('keydown', onKeybind)
    return () => document.removeEventListener('keydown', onKeybind)
  }, [onKeybind])

  return <>{children}</>
}

export default ColorModeLayout
