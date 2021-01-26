const path = require('path');

/**
 * Helper function infers Webpack aliases from tsconfig.json compilerOptions.baseUrl and
 * compilerOptions.paths.
 *
 * @param {string} tsconfigPath - Path to tsconfig.json (can be either relative or absolute path).
 * @return {object} An object representing analogous Webpack alias.
 */
module.exports = (tsconfigPath = path.resolve(__dirname, 'tsconfig.json')) => {
  const tsconfig = require(tsconfigPath);
  const { paths, baseUrl } = tsconfig.compilerOptions;

  return Object.fromEntries(Object.entries(paths)
    .filter(([, pathValues]) => pathValues.length > 0)
    .map(([pathKey, pathValues]) => {
      const key = pathKey.replace('/*', '');
      const value = path.resolve(path.dirname(tsconfigPath),
        baseUrl, pathValues[0].replace('/*', ''));
      return [key, value];
    }));
};