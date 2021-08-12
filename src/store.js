

import { createStore } from "vuex";
import axios from "axios";



export default createStore({
  namespaced: true,
  state: {
    character: [],
  },
  getters: {
    getCharacter (state) {
      return state.character
    }
  },

  mutations: {
    setCharacter (state, payload) {
      state.character = payload
    }
  },
  actions: {
    fetchCharacter: async ({ commit }) => {
      
      try {
        const response = await axios.get("https://rickandmortyapi.com/api/character");

        if (response.status === 200) {
         
          commit("setCharacter", response.data);
        }
      } catch (e) {
        console.log(e.response);
      }
    },
  },
})
