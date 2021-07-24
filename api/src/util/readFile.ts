import { readFileSync } from 'fs'

export const readFile = (filePath: string) => {
  return readFileSync(filePath).toString()
}
