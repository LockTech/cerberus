import { resolve } from 'path'

export const LocaleDirectory = resolve(__dirname, `../locales`)

export const LocaleLookupRegEx = /^([A-Za-z]*-?[A-Za-z]+\/[A-Za-z]*-?[A-Za-z]+).json$/
