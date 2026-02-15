import nextConfig from 'eslint-config-next'

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts', '.planning/**', 'node_modules/**'],
  },
  ...nextConfig,
]

export default eslintConfig
