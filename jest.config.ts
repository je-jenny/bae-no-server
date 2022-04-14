// eslint-disable-next-line import/no-import-module-exports
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '\\.test\\.ts$',
  globals: {
    'ts-jest': {
      diagnostics: true,
    },
  },
  testTimeout: 30000,
}
export default config
