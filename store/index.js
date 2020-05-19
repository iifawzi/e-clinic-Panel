export const state = () => ({
    locales: ['en', 'ar'],
    locale: 'ar'
  })
  
  export const mutations = {
    SET_LANG (state, locale) {
      if (state.locales.indexOf(locale) !== -1) {
        state.locale = locale
      }
    }
  }

  export const actions = {
    changeLang(vuexContext,lang){
      vuexContext.commit('SET_LANG',lang);
    }
  }

  export const getters =  {
    getLocale (state) {
      return state.locale;
    }
  }
