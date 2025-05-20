/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'default': '#006b56',
        'primary-color': '#E37769',
        'link-color': '#E37769',
        'link-hover-color': '#bf3d2c',
        'highlight': 'rgba(216, 27, 96, 0.125)',
        'page-background': '#fffaef',

        'aqua': '#008b70',
        'taupe': '#fffaef',
        'forest-green': '#006b56',
        'orange': '#E37769'
      },
      fontFamily: {
        'work-sans': ['"Work Sans"', 'sans-serif'],
        'source-serif': ['"Source Serif 4"', 'serif'],
        'serif': ['-apple-system-ui-serif', 'ui-serif', '"Spectral"', '"Georgia"', 'serif']
      }
    },
  },

  plugins: [
    function ({ addBase, config }) {
      addBase({
        '::selection': { background: config('theme.colors.highlight') },
        '::-moz-selection': { background: config('theme.colors.highlight') },
      })
    },
  ]
}

