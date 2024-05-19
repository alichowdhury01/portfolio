/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      // import all tailwindcss plugins
      config: './tailwind.config.js',
      
      
    },
  },
};

export default config;
