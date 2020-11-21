/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */

export function normalize(param: string[] | string | null | undefined) {
  if (!param) return '';
  if (Array.isArray(param)) return param[0];
  return param;
}

export function valuePassThrought(fn: () => any, isThrow?: boolean) {
  return (value: any) => {
    try {
      fn();
    } catch {
      // nothing to do
    }

    if (isThrow) {
      throw value;
    } else {
      return value;
    }
  };
}

export function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
