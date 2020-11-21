/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import parseArgs from 'minimist';
import { isCluster, fork } from './internal/cluster';
import run from './internal/run';

if (isCluster) {
  const scriptName = process.argv[2];
  if (scriptName) {
    const args = parseArgs(process.argv.slice(3), {
      boolean: ['dev'],
      string: ['env'],
    });

    const { initEnvironment } = require('./internal/env');
    initEnvironment(args);

    const script = require(`./scripts/${scriptName}`);
    run(script, args).catch((err: Error) => {
      console.error(err.stack);
      process.exit(1);
    });
  } else {
    console.error('Error: Missing script parameters.');
  }
} else {
  fork(__filename, process.argv.slice(2), {
    env: {
      ...process.env, // Search custom module definitions
      // https://github.com/TypeStrong/ts-node#help-my-types-are-missing
      TS_NODE_FILES: 'true',
    },
  });
}
