import { logger } from 'src/lib/logger'

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const characterLength = characters.length

export const randomStr = (length: number) => {
  logger.debug({ length }, 'Generating a random string.')

  let result = ''

  length = length <= 0 ? 1 : length
  length = length > 254 ? 254 : length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength))
  }

  return result
}
