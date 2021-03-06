export const RandomStrMaxLength = 300

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const characterLength = characters.length

export const randomStr = (length: number) => {
  let result = ''

  length = length <= 0 ? 1 : length
  length = length > RandomStrMaxLength ? RandomStrMaxLength : length

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength))
  }

  return result
}
