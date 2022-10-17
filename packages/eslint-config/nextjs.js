module.exports = {
    extends: [require.resolve("./core-without-import.js"), "next/core-web-vitals"],
    rules: {
        "react/display-name": "off",
        "react/prop-types": "off",
        "react/self-closing-comp": "error",
        "import/no-extraneous-dependencies": "error",
    },
};
