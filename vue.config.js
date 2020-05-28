const path =require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/gestionstck/'
  : '/',
  outputDir:path.resolve(__dirname,"../server/dist"),
  devServer:{
   proxy:{
     '/api':{
       target:'http://localhost:5000'
     }
   }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}