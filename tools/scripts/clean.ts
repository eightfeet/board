/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import fs from 'fs-extra';
import { BUILD_DIR } from '../config/paths.config';

/**
 * Cleans up the output (build) directory.
 */
async function clean() {
  await fs.remove(BUILD_DIR);
}

export default clean;
