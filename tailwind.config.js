module.exports = {
  mode: 'jit',
  content: [
    './client/.{js,ts,jsx,tsx}',
    './client/components/**/*.{js,ts,jsx,tsx}'
  ],
  media: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: ['.75rem', '1rem'], //font size, line height
      sm: ['.875rem', '1.5rem'],
      base: ['1rem', '1rem'],
      normal: ['1rem', '1rem'],
      lg: ['1.125rem', '1.125rem'],
      xl: ['1.25rem', '1.50rem'],
      "2xl": ['2rem', '3.5rem'],
      "3xl": ['3rem', '4.5rem'],
      "4xl": ['4rem', '5.5rem'],
      "5xl": ['5rem', '6.5rem'],
      "6xl": ['6rem', '7.5rem'],
      "7xl": ['7rem', '8.5rem'],
    },
  },
  variants: {},
  plugins: [],
}