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

// List your peer dependencies here
const peerDependencies = {
  "@typescript-eslint/eslint-plugin": "^6.19.0",
  "@typescript-eslint/parser": "^6.18.0",
  eslint: "^8.56.0",
  "eslint-config-airbnb": "^19.0.4",
  "eslint-config-airbnb-typescript": "^17.1.0",
  "eslint-config-prettier": "^9.1.0",
  "eslint-plugin-import": "^2.29.1",
  "eslint-plugin-jsx-a11y": "^6.8.0",
  "eslint-plugin-prettier": "^5.1.3",
  "eslint-plugin-react": "^7.33.2",
  "eslint-plugin-react-hooks": "^4.3.0",
  postcss: "^8.4.33",
  prettier: "^3.2.4",
  stylelint: "^16.2.0",
  "stylelint-config-standard-scss": "^13.0.0",
};

const packageJsonPath = path.join(process.cwd(), "package.json");

fs.readFile(packageJsonPath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err);
    return;
  }

  let packageJson;
  try {
    packageJson = JSON.parse(data);
  } catch (parseErr) {
    console.error("Error parsing package.json:", parseErr);
    return;
  }

  let missingDeps = [];
  for (const [dep, version] of Object.entries(peerDependencies)) {
    if (!packageJson.devDependencies[dep]) {
      missingDeps.push(`${dep}@${version}`);
    }
  }

  if (missingDeps.length > 0) {
    console.warn(
      "Missing peer dependencies. Please install the following packages:",
      missingDeps.join(", ")
    );
  } else {
    console.log("All peer dependencies are satisfied.");
  }
});
