// create-react-app 파일 참고
// https://github.com/facebookincubator/create-react-app/

var path = require('path');
var fs = require('fs');
var url = require('url');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

var envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  var hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}

function getPublicUrl(appPackageJson) {
  return envPublicUrl || require(appPackageJson).homepage;
}

//
function getServedPath(appPackageJson) {
  var publicUrl = getPublicUrl(appPackageJson);
  var servedUrl = envPublicUrl || (
    publicUrl ? url.parse(publicUrl).pathname : '/'
  );
  return ensureSlash(servedUrl, true);
}

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveApp('src/index.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json'))
};
