// import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                white: '#FFFFFF',

                yellow: '#FFBA42',
                red: '#D63737',
                blue: '#344BFD',
            },
        },
    },
    plugins: [
        nextui({
            themes: {
                light: {
                    colors: {
                        primary: {
                            foreground: '#FFFFFF',
                            DEFAULT: '#FFBA42',
                        },
                    },
                },
            },
        }),
    ],
}
