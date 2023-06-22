import { forwardRef } from 'react';
import { useWindowDimensions } from '../hooks/useWindowDimensions';

export function withWindowWidth(Component) {
  return forwardRef((props, ref) => {
    const windowSize = useWindowDimensions();
    return <Component {...props} windowSize={windowSize} ref={ref} />;
  });
}
