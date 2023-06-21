import { Link } from 'react-router-dom';

export function withConditionalLink(Component) {
  return function withConditionalLink({ to, ...otherProps }) {
    return to ? (
      <Link to={to}>
        <Component {...otherProps} />
      </Link>
    ) : (
      <Component {...otherProps} />
    );
  };
}
