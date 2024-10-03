import type { Linter } from 'eslint'

import antfu, { GLOB_TSX } from '@antfu/eslint-config'
import ii from '@importantimport/eslint-config'
// @ts-expect-error missing types
import reactCompiler from 'eslint-plugin-react-compiler'

export default antfu({
  react: true,
  typescript: true,
}, {
  files: [GLOB_TSX],
  plugins: {
    'react-compiler': reactCompiler,
  },
  rules: {
    'react-compiler/react-compiler': 'error',
  },
}).append(ii({ functional: false })) as Linter.Config
