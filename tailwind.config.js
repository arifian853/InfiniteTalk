/** @type {import('tailwindcss').Config} */
export default {
  content: ['node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: ['flowbite/plugin'],
}
