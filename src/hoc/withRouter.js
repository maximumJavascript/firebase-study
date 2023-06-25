import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function withRouter(Component) {
  return forwardRef((props, ref) => {
    const navigate = useNavigate();

    return <Component navigate={navigate} {...props} ref={ref} />;
  });
}
