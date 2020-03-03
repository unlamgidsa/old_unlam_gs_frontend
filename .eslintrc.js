module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jasmine": true,
        "amd": true
    },
    "globals": {
        "_": "readonly"
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "parser": "babel-eslint",
        "allowImportExportEverywhere": true,
        "ecmaVersion": 2015,
        "ecmaFeatures": {
            "impliedStrict": true
        }
    },
    "rules": {
        "no-bitwise": "warn",
        "curly": "warn",
        "eqeqeq": "warn",
        "guard-for-in": "warn",
        "no-extend-native": "warn",
        "no-inner-declarations": "off",
        "no-use-before-define": ["warn", "nofunc"],
        "no-caller": "warn",
        "no-sequences": "warn",
        "no-irregular-whitespace": "warn",
        "no-new": "warn",
        "no-shadow": "warn",
        "no-undef": "warn",
        "no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "args": "none"
            }
        ],
        "no-console": "off",
        "no-trailing-spaces": "warn",
        "array-bracket-spacing": "warn",
        "space-in-parens": "warn",
        "space-before-blocks": "warn",
        "comma-dangle": "warn",
        "eol-last": "warn",
        "new-cap": [
            "warn",
            {
                "capIsNew": false,
                "properties": false
            }
        ],
        "dot-notation": "warn",
        "vue/html-indent": [
            "warn",
            4,
            {
                "attribute": 1,
                "baseIndent": 0,
                "closeBracket": 0,
                "alignAttributesVertically": true,
                "ignores": []
            }
        ],
        "vue/html-self-closing": ["warn",
            {
                "html": {
                    "void": "never",
                    "normal": "never",
                    "component": "always"
                },
                "svg": "always",
                "math": "always"
            }
        ],
        "vue/max-attributes-per-line": ["warn", {
            "singleline": 1,
            "multiline": {
                "max": 1,
                "allowFirstLine": true
            }
        }],
        "vue/multiline-html-element-content-newline": "off",
        "vue/singleline-html-element-content-newline": "off"
    },
    "overrides": [
        {
            "files": ["*Spec.js"],
            "rules": {
                "no-unused-vars": [
                    "warn",
                    {
                        "vars": "all",
                        "args": "none",
                        "varsIgnorePattern": "controller",

                    }
                ]
            }
        }
    ]
};
