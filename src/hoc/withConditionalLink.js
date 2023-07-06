import { Link } from 'react-router-dom';

export function withConditionalLink(Component) {
  return function withConditionalLink({ to, linkClassName = '', ...otherProps }) {
    return to ? (
      <Link to={to} className={linkClassName}>
        <Component {...otherProps} />
      </Link>
    ) : (
      <Component {...otherProps} />
    );
  };
}
