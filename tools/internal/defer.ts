/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
class Defer<T = void> {
  public readonly promise: Promise<T>;

  public resolve!: (value?: T | Promise<T>) => void;

  public reject!: (reason?: any) => void;

  /**
   * Initialize deferred promise
   */
  constructor() {
    this.promise = new Promise<any>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

export default Defer;
