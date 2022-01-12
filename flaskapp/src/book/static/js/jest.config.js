const config = {
    verbose: true,
    transform: {
    '.js': 'jest-esm-transformer',
    },
    "automock": false,
    "resetMocks": false,
    "setupFiles": [
      "./setupJest.js"
    ]
};



module.exports = config;
