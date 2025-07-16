const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const mf = require('@angular-architects/module-federation/webpack');
const path = require('path');

module.exports = withModuleFederationPlugin({
  remotes: {
    remoteApp: 'remoteApp@http://localhost:5001/assets/remoteEntry.js'
  },

  shared: {
    ...mf.shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
