module.exports = {
  '**/*.ts?(x)': () => 'npm run type:check',
  '**/*.test.ts': () => 'npm run test',
  '**/*.(ts|js)?(x)': (api) => `npm run lint ${api.filenames.join(' ')}`,
}
