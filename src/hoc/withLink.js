import { Link } from 'react-router-dom';

export function withLink(Component) {
  return function WithLink({ to, ...otherProps }) {
    return (
      <Link to={to}>
        <Component {...otherProps} />
      </Link>
    );
  };
}
