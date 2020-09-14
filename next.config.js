const withPlugins = require('next-compose-plugins');
const CompressionPlugin = require('compression-webpack-plugin');
const withCSS = require('@zeit/next-css');

const nextConfig = {
    webpack: (config) => {
        // polyfill dependencies to replace @babel/polyfill(deprecated in babel 7.4.0)
        const originalEntry = config.entry;
        config.entry = async () => {
            const entries = await originalEntry();
            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                entries['main.js'].unshift('./polyfills.js');
            }
            return entries;
        };

        // add webpack plugins whatever you want
        if(process.env.NODE_ENV === 'production') config.plugins.push(new CompressionPlugin());
        return config;
    },
    publicRuntimeConfig: {
        IMAGE_URL: '',
        NODE_ENV: process.env.NODE_ENV || 'dev',
        API_ENV: process.env.API_ENV || 'dev',
        SENTRY_DSN: process.env.SENTRY_DSN,
    },
};

module.exports = withPlugins([
    [
        withCSS({
            cssModules: true
        })
    ]
], nextConfig);
