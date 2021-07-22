import path from 'path';

module.exports = {
    entry: './src/index.js',
    target: ['node', 'es2015'],
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};
