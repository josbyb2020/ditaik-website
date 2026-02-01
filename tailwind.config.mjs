/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                electric: {
                    500: '#FF4400',
                    DEFAULT: '#FF4400',
                },
                slate: {
                    950: '#020617',
                }
            },
            fontFamily: {
                sans: ['"Inter Tight"', 'sans-serif'],
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                }
            },
            boxShadow: {
                'glow': '0 0 40px -10px rgba(255, 68, 0, 0.3)',
            }
        },
    },
    plugins: [],
}
