module.exports = {
  content: ['./themes/**/*.{html,js}', './layouts/**/*.html'],
  theme: {
    extend: {
      colors: {
        'dark-grey': 'var(--dark-grey-color)',
        'dark-blue': 'var(--dark-blue-color)',
        'medium-blue': 'var(--medium-blue-color)',
        'light-blue': 'var(--light-blue-color)',
        'dark-magenta': 'var(--dark-magenta-color)',
        'medium-magenta': 'var(--medium-magenta-color)',
        'light-magenta': 'var(--light-magenta-color)',
        background: 'var(--background-color)',
        'background-text': 'var(--background-text-color)',
        'content-background': 'var(--content-background-color)',
        'content-text': 'var(--content-text-color)',
        'content-border': 'var(--content-border-color)',
        link: 'var(--content-link-color)',
      },
      spacing: {
        header: 'var(--header-height)',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
