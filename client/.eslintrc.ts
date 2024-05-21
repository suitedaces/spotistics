export enum Environment {
  Browser = 'browser',
  ES2020 = 'es2020',
  Node = 'node',
}

export enum ReactVersion {
  Version18_2 = '18.2',
}

export interface ESLintConfig {
  root: boolean;
  env: {
    browser: boolean;
    es2020: boolean;
    node: boolean;
  };
  extends: string[];
  ignorePatterns: string[];
  parserOptions: {
    ecmaVersion: string;
    sourceType: string;
  };
  settings: {
    react: {
      version: ReactVersion;
    };
  };
  plugins: string[];
  rules: {
    [key: string]: any;
  };
}

const eslintConfig: ESLintConfig = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: ReactVersion.Version18_2 } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};

export default eslintConfig;