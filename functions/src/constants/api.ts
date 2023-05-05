const isProd = process.env.NODE_ENV === 'production';
const baseOrigin = isProd
  ? 'https://maximumjavascript.github.io'
  : 'http://localhost:3000';

export { baseOrigin, isProd };
