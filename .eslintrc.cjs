module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: [
        "react-refresh",
        "@typescript-eslint",
    ],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "quotes": [
            "error",
            "double",
            { "avoidEscape": true }
        ],
        "semi": [
            "error",
            "always"
        ],
        "eol-last": [
            "error",
            "always"
        ],
        "@typescript-eslint/no-non-null-assertion": "off",
        "react-refresh/only-export-components": "off"
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    },
}
