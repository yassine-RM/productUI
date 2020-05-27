const path =require('path')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/gestionstck/'
  : '/',
  outputDir:path.resolve(__dirname,"../server/public"),
  devServer:{
   proxy:{
     '/api':{
       target:'http://localhost:3000'
     }
   }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}