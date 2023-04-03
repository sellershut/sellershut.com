/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-ignore

import stringifyObject from 'stringify-object';

export const apiStringify = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null) {
      delete obj[key];
    }
  });
  return stringifyObject(obj, {
    singleQuotes: false,
  });
};

export default apiStringify;
