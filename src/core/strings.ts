/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

import { escapeRegExp } from './utils';

/**
 * Replace string template
 * @param source
 * @param values
 * @example
 *   // 'https://example.com/?id=1&token=xxxxxxxx&unset='
 *   template('https://example.com/?token={token}&unset={unset}', {
 *     id: 1,
 *     token: 'xxxxxxxx',
 *   });
 */
export function template(source: string, values: any, symbols: [start: string, end: string] = ['{', '}']) {
  if (!source || !source.length) return '';

  const start = symbols[0];
  const end = symbols[1];
  const regex = new RegExp(`${escapeRegExp(start)}([\\S\\s]+?)${escapeRegExp(end)}`, 'gi');
  let matchs: RegExpExecArray | null;
  let result = source;
  // eslint-disable-next-line no-cond-assign
  while ((matchs = regex.exec(source))) {
    const [, key] = matchs;
    const placeholder = `${start}${key}${end}`;
    const value = values[key] || '';
    result = result.replace(placeholder, value);
  }
  return result;
}
