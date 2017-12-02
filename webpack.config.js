// entry
const path = require('path')
module.exports = {
	entry: "./src/app.js",
	output: {
		path: path.join(__dirname, '../lb-todo/client'),
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			loader: 'babel-loader',
			test: /\.js$/,
			exclude: /node_modules/
		}]
	},
}