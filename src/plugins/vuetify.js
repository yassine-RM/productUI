import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify);
import colors from 'vuetify/lib/util/colors'
export default new Vuetify({
    icons: {
        iconfont: 'mdi'
      },
    theme: {
        themes: {
          light: {
            secondary: colors.red.lighten4, 
            accent: colors.indigo.base, 
          },
        },
      },
});
