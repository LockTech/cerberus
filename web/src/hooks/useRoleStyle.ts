import { colorAtLightness } from 'niceramps'
import { useMemo } from 'react'

const toLinear = (a) =>
  0.04045 < a ? Math.pow((a + 0.055) / 1.055, 2.4) : a / 12.92
const hexToRgb = (hex) => {
  hex = Number(hex.replace('#', '0x'))
  return [hex >> 16, hex >> 8, hex].map((c) => toLinear((c & 0xff) / 255))
}

export const roleStyle = (hex: string) => {
  const rgb = hexToRgb(hex)

  const brightness = Math.round(
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000
  )

  const backgroundColor = hex
  const borderColor = colorAtLightness(hex, 50)
  const color = brightness > 0 ? 'black' : 'white'

  return { backgroundColor, borderColor, color }
}

export const useRoleStyle = (hex: string) => {
  const res = useMemo(() => roleStyle(hex), [hex])

  return res
}
