const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  db: {
    name: "galleryApp",
    url: "mongodb://localhost"
  },
  fb: {
    appId: "514789883303531",
    appSecret: "cea8122f0c929681843d19d75b4e5f35"
  }
};