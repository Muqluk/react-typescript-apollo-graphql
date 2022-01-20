import { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export default (target: React.MutableRefObject<any>) => {
  const [size, setSize] = useState<any>();

  useLayoutEffect(() => {
    setSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
};
