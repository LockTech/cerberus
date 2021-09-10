declare module 'niceramps' {
  export const namedColors: Record<string, string>

  export interface Options {
    /**
     * distance between shades 0 is black and 100 is white
     * @default 10
     */
    increment: number
    /**
     * 0 is pure paint 1 is pure ink
     * @default 0.4
     */
    saturation: number
  }

  export function colorAtLightness(
    inputColor: string,
    lightness: number,
    options?: Options
  ): string

  export function ramp(
    inputColor: string,
    options?: Options
  ): Record<string, string>

  export function tailwindRamp(
    inputColor: string,
    options?: Options
  ): Record<string, string>
}
