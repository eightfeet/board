// Lint-staged configuration
// https://github.com/okonet/lint-staged#configuration
module.exports = {
  '*.{js,jsx,ts,tsx}': ['prettier --write'],
  '*.{css,less,scss,sass}': ['prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
