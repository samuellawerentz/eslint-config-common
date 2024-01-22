const fs = require("fs");
const path = require("path");

const files = [
  {
    name: ".eslintrc.json",
    content: `{
    "extends": ["@contacto-io/eslint-config-common"]
}
`,
  },
  {
    name: ".stylelintrc.json",
    content: `{
    "extends": "@contacto-io/eslint-config-common/stylelint"
}`,
  },
  {
    name: ".lintstagedrc.json",
    content: `{
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{scss,less,css}":[
      "stylelint --fix"
    ]
  }`,
  },
];

files.forEach((file) => {
  const filePath = path.join(process.cwd(), file.name);
  if (!fs.existsSync(filePath)) {
    fs.writeFile(filePath, file.content, "utf8", (err) => {
      if (err) {
        console.error(`Error writing ${file.name}:`, err);
      } else {
        console.log(`${file.name} created successfully.`);
      }
    });
  } else {
    console.log(`${file.name} already exists.`);
  }
});
