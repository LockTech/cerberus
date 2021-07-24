const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const characterLength = 36

export const randomStr = (length: number) => {
  let result = ''

  if (length <= 0) {
    length = 1
  }

  if (length > 254) {
    length = 254
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characterLength))
  }

  return result
}
