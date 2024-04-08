  // tailwind.config.js
  module.exports = {
    purge: [
      './**/*.html',
      './**/*.tsx',
    ],
     darkMode: false, // or 'media' or 'class'
     theme: {
       extend: { spacing: {
        'half' : "50%",
        "full" : "100%"
      },},
     },
     variants: {},
     plugins: [],
   }