module.exports = {
    content: ['./themes/**/*.{html,js}','./layouts/**/*.html'],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [require('@tailwindcss/typography')],
};
