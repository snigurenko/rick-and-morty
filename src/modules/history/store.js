  import axios from "axios";

  
  const history = {
    namespaced: true,
    state: {
      character: null,
      characterObj: [],
    },
    getters: {
      getCharacter (state) {
        return state.character
      },

      getCharacterObj (state) {
        return state.characterObj
      }
    },
  
    mutations: {
      setCharacter (state, payload) {
        state.character = payload
      },

      setCharacterObj (state, obj) {
        state.characterObj.push(obj)
      }
    },
    actions: {
      fetchCharacter: async ({ commit }) => {
        // debugger
        try {
          const response = await axios.get("https://rickandmortyapi.com/api/character/1,2,3,4,5");
  
          if (response.status === 200) {
             
              const temp = response.data.map(
                (character) => ({
                    label: character.name,
                    id: character.id,
                    img: character.image
                })
              )
              console.log(temp)
            commit("setCharacter", temp);
          }
        } catch (e) {
          console.log(e.response);
        }
      },
    
    },
  };

  export default history;
  