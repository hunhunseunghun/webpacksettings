const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 개발모드, development or production
  mode: 'development',

  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: {
    main: './src/App.jsx',
    // By default, the output filename for the entry chunk is extracted from output.filename but you can specify a custom output filename for a specific entry:
    // home: { import: './contact.js', filename: 'pages/[name][ext]' },
    // about: { import: './about.js', filename: 'pages/[name][ext]' },
  },

  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 바벨과 같은 로더 등록
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: ['/node_modules/'],
      },

      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          // [sass-loader](/loaders/sass-loader)
        ],
      },
    ],
  },

  // 빌드 설정
  output: {
    path: path.resolve(__dirname, 'build'), // 빌드되는 파일들이 만들어지는 위치, __dirname: 현재 디렉토리
    filename: '[name].js', // 번들파일 이름
  },

  // webpack 서버 설정
  devServer: {
    static: path.join(__dirname, 'build'), // 이 경로에 있는 파일이 변경될 때 다시 컴파일
    port: 8088, // 서버 포트 지정
    overlay: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, build에 새로운 html 파일 생성
      template: `./public/index.html`,
    }),
  ],
};
