export function StarIcon(props) {
  const handlers = {
    onMouseEnter: props.onMouseEnter,
    onClick: props.onClick,
    onMouseMove: props.onMouseMove,
  };

  if (!props.filled || props.filled < 0) {
    return <StarIconSvg {...handlers} className={props.className} fill={'transparent'} />;
  } else if (props.filled >= 1) {
    return (
      <StarIconSvg {...handlers} className={props.className} fill={'currentColor'} />
    );
  } else {
    const percentage = `${props.filled * 100}%`;
    const number = props.number ? props.number : '';
    return (
      <StarIconSvg {...handlers} className={props.className} fill={`url(#${number})`}>
        <linearGradient id={`${number}`} x1="0" x2="100%" y1="0" y2="0">
          <stop offset={percentage} stopColor={'currentColor'} />
          <stop offset={percentage} stopColor={'transparent'} />
        </linearGradient>
      </StarIconSvg>
    );
  }
}

function StarIconSvg(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="-1 -1 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
      onMouseEnter={props.onMouseEnter}
      onClick={props.onClick}
      onMouseMove={props.onMouseMove}
    >
      <path
        d="M13 5.05469C13 5.19532 12.8985 5.32813 12.7969 5.42969L9.96095 8.19532L10.6328 12.1016C10.6406 12.1563 10.6406 12.2031 10.6406 12.2578C10.6406 12.461 10.5469 12.6485 10.3203 12.6485C10.2109 12.6485 10.1016 12.6094 10.0078 12.5547L6.50001 10.7109L2.99219 12.5547C2.89063 12.6094 2.78907 12.6485 2.67969 12.6485C2.45313 12.6485 2.35157 12.461 2.35157 12.2578C2.35157 12.2031 2.35938 12.1563 2.36719 12.1016L3.03907 8.19532L0.195313 5.42969C0.101563 5.32813 0 5.19532 0 5.05469C0 4.82032 0.242188 4.72657 0.437501 4.69532L4.35938 4.125L6.11719 0.570313C6.18751 0.421875 6.32032 0.25 6.50001 0.25C6.6797 0.25 6.81251 0.421875 6.88282 0.570313L8.64064 4.125L12.5625 4.69532C12.75 4.72657 13 4.82032 13 5.05469Z"
        fill={props.fill || 'currentColor'}
        stroke="#515151"
        strokeWidth={1}
      />

      {props.children}
    </svg>
  );
}
