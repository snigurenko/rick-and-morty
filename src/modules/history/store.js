


  import axios from "axios";

  
  const history = {
    namespaced: true,
    state: {
      character: 'cjadsnbl',
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
        debugger
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
  };

  export default history;
  