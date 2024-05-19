/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#64748b',
          'primary-content': '#f8fafc',
        },
      },
      {
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#e2e8f0',
          'primary-content': '#1e293b',
          'base-100': '#262626',
        },
      },
    ],
    logs: false,
  },
}
