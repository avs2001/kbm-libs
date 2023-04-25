const fs = require('fs');
const path = require('path');

function bumpVersion(version) {
  const versionArray = version.split('.');
  const patch = parseInt(versionArray.pop()) + 1;
  versionArray.push(patch);
  return versionArray.join('.');
}

function updatePackageVersions(dirPath, version) {
  const packageJsonPath = path.join(dirPath, 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = require(packageJsonPath);
    const oldVersion = packageJson.version;
    const newVersion = bumpVersion(oldVersion || version);
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(`Updated version in ${packageJsonPath} from ${oldVersion} to ${newVersion}`);
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);

    if (fs.statSync(filePath).isDirectory()) {
      updatePackageVersions(filePath, version);
    }
  });
}

const version = '1.0.0'; // replace with your desired version number
const rootDir = `${__dirname}/../projects`; // replace with the path to your root directory
updatePackageVersions(rootDir, version);

