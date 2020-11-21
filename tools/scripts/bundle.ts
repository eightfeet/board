/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
import webpack from 'webpack';
import Defer from '../internal/defer';
import webpackConfig from '../config/webpack.config';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  const compiler = webpack(webpackConfig);
  const deferred = new Defer();

  compiler.run((err, stats) => {
    if (err) {
      return deferred.reject(err);
    }

    console.info(stats.toString(webpackConfig.stats));
    return deferred.resolve();
  });

  return deferred.promise;
}

export default bundle;
