const config = {
  verbose: true,
  transform: {
   '.js': 'jest-esm-transformer',
},
  roots: ["../src/book/static/js"]

};

module.exports = config;