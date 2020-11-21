/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import { Options } from 'http-proxy-middleware';

declare interface ProxyOptions extends Options {
  context: string | string[];
}

// Configure proxy middleware
// https://github.com/chimurai/http-proxy-middleware
export default [
  // {
  //   context: '/',
  //   target: process.env.PROXY_HOST,
  //   changeOrigin: true,
  // },
] as ProxyOptions[];
