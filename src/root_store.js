// as it's a test project, I decided to show how I will build store in case if my app potentially needs more than one store. 
// usually, I put one store file to each module
// that because I use modules 

import { createStore } from "vuex";

import history from './modules/history/store'

export default createStore({
  modules: {
    history,
  },
  devtools: true,
})
