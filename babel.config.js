module.exports = {
    presets: [
        ['next/babel', {
            'preset-env': {
                useBuiltIns: 'usage',
                corejs: { version: 3, proposals: true },
                shippedProposals: true
            },
            'styled-jsx': {
                'plugins': [
                    'styled-jsx-plugin-sass'
                ]
            }
        }
        ],
    ],
    plugins: [
        "@babel/plugin-proposal-nullish-coalescing-operator",
        "@babel/plugin-proposal-optional-chaining",
    ]
}
