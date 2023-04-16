module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    esmodules: true,
                },
            },
        ],
        '@babel/react',
    ],
    plugins: ['@loadable/babel-plugin', 'babel-plugin-webpack-alias'],
};
