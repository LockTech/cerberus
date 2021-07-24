import { getConfig, render } from 'squirrelly'

import { readFile } from 'src/util/readFile'

export interface TemplateData extends Record<string, unknown> {}

const config = getConfig({})

export const template = (str: string, data: TemplateData) =>
  render(str, data, config)

export const templateFile = (path: string, data: TemplateData) => {
  const file = readFile(path)
  return template(file, data)
}
