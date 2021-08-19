// as it's a test project, I decided to show how I will build store in case if my app potentially needs more than one store.
// usually, I put one store file to each module
// that because I use modules

import { createStore, createLogger } from "vuex";
import createPersistedState from "vuex-persistedstate";

import history from './modules/history/store'

// Sure it 's possible to use imperative method and set localStorage 'by hand',
// but why, if I can use plugin and project conditions will be complit too
const plugins = [
  createPersistedState({
    paths: ["history"],
  }),
];

// On to see store interactions, I used during developing (should import createLogger from vuex)
//
if (process.env.NODE_ENV !== "production") {
  plugins.push(createLogger({}));
}

export default createStore({
  plugins,
  modules: {
    history,
  },
  devtools: true,
})
