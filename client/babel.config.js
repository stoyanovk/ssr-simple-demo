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
        '@babel/preset-typescript',
    ],
    plugins: ['@loadable/babel-plugin', 'babel-plugin-webpack-alias'],
};
