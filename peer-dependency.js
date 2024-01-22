const fs = require("fs");
const path = require("path");

// List your peer dependencies here
const peerDependencies = {
  "some-peer-dependency": "^1.0.0",
  "another-peer-dependency": "^2.0.0",
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
