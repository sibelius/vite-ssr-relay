import { Writable } from 'stream';

export class WritableAsPromise extends Writable {
  constructor() {
    super();

    this._output = ``;
    this._deferred = {
      promise: null,
      resolve: null,
      reject: null,
    };
    this._deferred.promise = new Promise((resolve, reject) => {
      this._deferred.resolve = resolve;
      this._deferred.reject = reject;
    });
  }

  _write(chunk, _, next) {
    this._output += chunk.toString();
    next();
  }

  _destroy(error, next) {
    if (error instanceof Error) {
      this._deferred.reject(error);
    } else {
      next();
    }
  }

  end() {
    this._deferred.resolve(this._output);
    this.destroy();
  }

  // disguise us as a promise
  then(resolve, reject) {
    return this._deferred.promise.then(resolve, reject);
  }
}
