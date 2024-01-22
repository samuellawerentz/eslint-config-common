module.exports = {
  extends: "stylelint-config-standard-scss",
  rules: {
    "selector-class-pattern": [
      "^Mui.*$|^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
      {
        message: "Expected custom property name to be kebab-case",
        severity: "warning",
      },
    ],
    "font-family-no-missing-generic-family-keyword": null,
    "no-duplicate-selectors": true,
    "selector-type-no-unknown": [
      true,
      {
        ignore: ["custom-elements", "default-namespace"],
      },
    ],
  },
};
