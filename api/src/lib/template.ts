import { getConfig, render } from 'squirrelly'

export interface TemplateData extends Record<string, unknown> {}

const config = getConfig({})

/**
 * Wrapper around [SquirrellyJS'](https://squirrelly.js.org/) `render` function, providing a consistent `config` to all invocations.
 *
 * **IMPORTANT:** `data` is **NOT** escaped by this function.
 * You are responsible for ensuring any data a user has input is sanatized or rejected prior.
 */
export const template = (str: string, data: TemplateData) =>
  render(str, data, config)
