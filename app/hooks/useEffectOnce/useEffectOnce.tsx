'use client';

import { EffectCallback, useEffect, useRef } from 'react';

export function useEffectOnce(effect: EffectCallback) {
  const effectFunc = useRef(effect);

  const destroyFunc = useRef<void | any>(undefined);
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (calledOnce.current) {
      renderAfterCalled.current = true;
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = effectFunc.current();

    return () => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
  }, []);
}
