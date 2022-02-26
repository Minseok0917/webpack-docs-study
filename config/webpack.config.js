const dotenv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


/*
	process.env 

	
*/

{
	const envMode = process.env.mode;
	const envPath = path.join(__dirname,'../env');
	const envFile = (
		envMode === 'dev' ? 'dev.env' :
		envMode === 'prd' ? 'prd.env' : 
		''
	);
	dotenv.config({ path: path.join(envPath,envFile) });
	dotenv.config({ path: path.join(envPath,'common.env') });
}


console.log('resolve',path.resolve(__dirname, '../dist'))
console.log('join',path.join(__dirname, '../dist'))

module.exports = {
	mode: process.env.mode === 'dev' ? 'development' : 'production',
	entry:'./src/index.js',
	output: {
		filename: `main.js`,
		path: path.resolve(__dirname, '../dist')
	},
	module:{
		rules:[{
			test:/\.js$/,
			use:{
				loader:'babel-loader',
				options:{
					presets:['@babel/preset-env'],
					plugins:[
						'babel-plugin-transform-inline-environment-variables',
						'@babel/plugin-syntax-jsx',
						`@babel/plugin-transform-react-jsx`,
					]
				}
			,}
		},{
			test:/\.custom-css$/,
			use:[
				{ loader:'style-loader'}, // html head style 
				{ loader:'css-loader'}, // javascript css 를 읽을수 컴파일 
				{ loader:'scss-loader'} // scss 를 css 로 컴파일
			]
			
		}]
	},
	resolve:{
		alias:{
			'@':path.resolve(__dirname,'src')
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'index.html'
		})
	],
	devServer: {
		static: {
			directory: path.join(__dirname, '../'),
		},
	    client: {
	      progress: true,
	    },
		compress: true,
		port: 9000,
	},
};
