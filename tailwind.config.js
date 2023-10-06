const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
              'loyalis': '#1A2C5C',
              'fondo': '#EEF7FF',
              'primary-btn': '#0A41BC',
              'secondary-btn': '#3D8AF4',
              'info-btn': '#00ADB8',
              'help-btn': '#808080',
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
