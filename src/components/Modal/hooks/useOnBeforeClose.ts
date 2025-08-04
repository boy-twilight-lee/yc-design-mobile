import { isBoolean } from '@shared/utils';
import { OnBeforeOk, OnBeforeCancel } from '../type';

export default async (
  type: string,
  onBeforeOk?: OnBeforeOk,
  onBeforeCancel?: OnBeforeCancel
) => {
  const handleBeforeOk = () => {
    return new Promise<boolean>(async (resolve) => {
      const closeResult = onBeforeOk?.(resolve) ?? true;
      let isClose = true;
      if (isBoolean(closeResult)) {
        isClose = closeResult;
      } else if (closeResult instanceof Promise) {
        try {
          const _isClose = await closeResult;
          if (isBoolean(_isClose)) {
            isClose = _isClose;
          }
        } catch {
          isClose = false;
        }
      }
      resolve(isClose);
    });
  };
  let isClose: boolean;
  if (type == 'ok') {
    isClose = await handleBeforeOk();
  } else {
    isClose = onBeforeCancel?.() ?? true;
  }
  return isClose;
};
