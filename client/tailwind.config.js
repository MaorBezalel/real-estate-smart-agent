/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                text: '#001f24',
                background: '#f5feff',
                primary: '#fe583e',
                secondary: '#c7f7ff',
                accent: '#f92201',
            },
        },
        screens: {
            'mobile-sm': '320px',
            'mobile-md': '375px',
            'mobile-lg': '425px',

            'tablet-sm': '640px',
            'tablet-md': '768px',
            'tablet-lg': '1024px',

            'laptop-sm': '1280px',
            'laptop-md': '1440px',
            'laptop-lg': '1680px',
        },
    },
    plugins: [],
};
