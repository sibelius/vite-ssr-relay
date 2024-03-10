import { WritableAsPromise } from './WritableAsPromise';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 10000;

export const renderToPipeableStreamPromise = async (
  tree: ReactElement,
) => {
  const writableStream = new WritableAsPromise();

  let didError = false;

  const { pipe, abort } = renderToPipeableStream(tree, {
    onAllReady() {
      pipe(writableStream);
    },
    onError(error) {
      writableStream.destroy(error)
    },
  });

  setTimeout(() => {
    writableStream.destroy();
    abort();
  }, ABORT_DELAY);

  return await writableStream;
};