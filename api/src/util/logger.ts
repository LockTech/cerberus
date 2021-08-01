/**
 * Build an ambigous `path` to be redacted from a Pino logger.
 *
 * Optionally add a `prefix` to that path.
 *
 * @param redacted The bottom-most field to be redacted from the logger
 * @param prefix An optional string to apply before `redacted`, examples are:
 *  * `path.to.some`
 *  * `*`
 * @returns A string to be added as a path to Pino's redact feature.
 */
export const buildRedactString = (redacted: string, prefix?: string) =>
  `${(prefix && prefix + '.') || ''}${redacted}`
