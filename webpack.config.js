const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	
	//Define el entry point de la aplicación
	entry: {
    app: './src/index.js'
  },

  //Define dónde se creará la build de producción
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },

  //Para correr el build como desarrollador
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'index.html'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    //Define variables globales para decirle a Phaser que incluya renderer para Canvas y Webgl
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    })
  ]

};