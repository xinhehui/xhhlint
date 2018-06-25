module.exports = {
    dependence: {
        npm: {
            "babel-eslint": "8.2.3",
            "eslint": "4.19.1",
            "eslint-config-airbnb": "16.1.0",
            "eslint-config-vue": "2.0.2",
            "eslint-plugin-import": "2.12.0",
            "eslint-plugin-jsx-a11y": "6.0.3",
            "eslint-plugin-lean-imports": "0.3.3",
            "eslint-plugin-react": "7.9.1",
            "eslint-plugin-vue": "4.5.0",
            "stylelint": "9.3.0",
            "stylelint-config-standard": "18.2.0",
            "stylelint-processor-html": "1.0.0"
        }
    },
    plan: {
        es6: ['.eslintrc_es6.json', '.stylelintrc.json'],
        es5: ['.eslintrc_es5.json', '.stylelintrc.json'],
        node: ['.eslintrc_node.json'],
        vue: ['.eslintrc_vue.json', '.stylelintrc.json'],
        react: ['.eslintrc_react.json', '.stylelintrc.json'],
        default: ['.eslintrc_es6.json', '.stylelintrc.json']
    },
    initHooks: 'update_git_hooks.sh'
}