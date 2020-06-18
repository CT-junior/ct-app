const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://127.0.0.1:3333/',
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
    }
];

module.exports = PROXY_CONFIG;