/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import cp from 'child_process';

export const isCluster = !!process.send;

/**
 * Cluster signal
 */
export enum Signal {
  Restart = '@@SIG_RESTART',
}

/**
 * Fork a cluster
 * @param {String} modulePath
 * @param {ReadonlyArray<string>} args
 * @param {cp.ForkOptions} options
 */
export function fork(modulePath: string, args?: readonly string[], options?: cp.ForkOptions) {
  const child = cp.fork(modulePath, args, options);

  child.on('message', (msg) => {
    switch (msg) {
      case Signal.Restart:
        child.kill();
        setImmediate(fork, modulePath, args, options);
        break;
      default:
        break;
    }
  });

  return child;
}

export function restart() {
  if (process.send) {
    process.send(Signal.Restart);
  }
}
