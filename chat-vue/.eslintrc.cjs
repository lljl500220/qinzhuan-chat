module.exports = {
    "env": {
        browser: true,
        es2021: true,
        node: true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/vue3-essential"
    ],
    parser: 'vue-eslint-parser',
    overrides: [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    parserOptions: {
        project: ['tsconfig.json'],
        extraFileExtensions: ['.vue'],
        ecmaVersion: "latest",
        parser: "@typescript-eslint/parser",
        sourceType: "module"
    },
    plugins: [
        "@typescript-eslint",
        "vue"
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": ["off"],
        'vue/multi-word-component-names': 'off',
        'no-undef': 'off'
    }
}