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
        
      },
      //Para solucionar un error al integrar Phaser
      //http://www.html5gamedevs.com/topic/39352-webpacket-typescript-phaser-3-error-with/
      {
        test: [ /\.vert$/, /\.frag$/ ],
        use: 'raw-loader'
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
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'build')
      }
    ]),
    //Define variables globales para decirle a Phaser que incluya renderer para Canvas y Webgl
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'production-dependencies',
      filename: 'production-dependencies.bundle.js'
    }),
  ]

};