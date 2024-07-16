/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}" , "./**/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#232f3e",
        secondary: "#394351",
        link_orange: "#e47911",
        link_red: "#dc2626",
        custom_yellow: "#ffd814",
        hover_yellow: "#eab308",
      },
      fontFamily: {
        'Nunito_ExtraLight': 'Nunito_ExtraLight',
        'Nunito_Light': 'Nunito_Light',
        'Nunito_Regular': 'Nunito_Regular',
        'Nunito_Medium': 'Nunito_Medium',
        'Nunito_SemiBold': 'Nunito_SemiBold',
        'Nunito_Bold': 'Nunito_Bold',
        'Nunito_ExtraBold': 'Nunito_ExtraBold',
        'Nunito_Black': 'Nunito_Black',
      }
    },
  },
  plugins: [],
}


