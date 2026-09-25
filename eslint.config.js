import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // ── Ignore patterns ────────────────────────────────────────────
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      'coverage/**',
      'extracted_docx_media/**',
      'public/**',
    ],
  },

  // ── Base JS rules ──────────────────────────────────────────────
  js.configs.recommended,

  // ── TypeScript + React files ───────────────────────────────────
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
      globals: {
        window:      'readonly',
        document:    'readonly',
        navigator:   'readonly',
        console:     'readonly',
        setTimeout:  'readonly',
        clearTimeout:'readonly',
        setInterval: 'readonly',
        clearInterval:'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame:  'readonly',
        IntersectionObserver:  'readonly',
        ResizeObserver:        'readonly',
        performance:           'readonly',
        fetch:                 'readonly',
        URL:                   'readonly',
        URLSearchParams:       'readonly',
        HTMLDivElement:        'readonly',
        HTMLElement:           'readonly',
        HTMLInputElement:      'readonly',
        HTMLTextAreaElement:   'readonly',
        HTMLSelectElement:     'readonly',
        HTMLFormElement:       'readonly',
        HTMLButtonElement:     'readonly',
        MouseEvent:            'readonly',
        KeyboardEvent:         'readonly',
        React:                 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react':              reactPlugin,
      'react-hooks':        reactHooks,
      'react-refresh':      reactRefresh,
      'prettier':           prettierPlugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // ── Prettier integration ──────────────────────────────────
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],

      // ── TypeScript ────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any':          'warn',
      '@typescript-eslint/no-unused-vars':           ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-non-null-assertion':    'warn',
      '@typescript-eslint/consistent-type-imports':  ['warn', { prefer: 'type-imports' }],
      '@typescript-eslint/no-floating-promises':     'off',
      '@typescript-eslint/no-misused-promises':      'off',

      // ── React ─────────────────────────────────────────────────
      'react/react-in-jsx-scope':    'off',   // not needed with React 17+ JSX transform
      'react/prop-types':            'off',   // TypeScript handles this
      'react/display-name':          'off',
      'react/no-unknown-property':   'error',
      'react/jsx-key':               'error',
      'react/self-closing-comp':     'warn',
      'react/no-array-index-key':    'warn',
      'react/jsx-no-duplicate-props':'error',
      'react/jsx-no-undef':          'error',
      'react/jsx-uses-react':        'off',
      'react/jsx-uses-vars':         'error',

      // ── React Hooks ───────────────────────────────────────────
      'react-hooks/rules-of-hooks':  'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ── React Refresh (HMR) ───────────────────────────────────
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // ── General JS quality ────────────────────────────────────
      'no-console':                  ['warn', { allow: ['warn', 'error'] }],
      'no-debugger':                 'error',
      'no-duplicate-imports':        'error',
      'no-var':                      'error',
      'prefer-const':                'warn',
      'prefer-template':             'warn',
      'object-shorthand':            'warn',
      'no-unused-expressions':       'warn',
      'eqeqeq':                      ['error', 'always'],
      'curly':                       ['warn', 'multi-line'],

      // ── Disable base rules overridden by TS versions ──────────
      'no-unused-vars':              'off',   // handled by @typescript-eslint/no-unused-vars
      'no-undef':                    'off',   // TypeScript handles this
    },
  },

  // ── Apply prettier config last to disable conflicting rules ───
  prettierConfig,
];
