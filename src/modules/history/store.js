  import axios from "axios";

  
  const history = {
    namespaced: true,
    state: {
      character: [],
      characterObj: [],
      selectedCharacterId: null,
      electedCharacter: [],

    },
    getters: {
      getCharacter (state) {
        return state.character
      },

      getCharacterObj (state) {
        return state.characterObj
      }, 

      getSelectedCharacterId (state) {
        return state.selectedCharacterId
      },

      getSelectedCharacter (state) {
        return state.selectedCharacter
      }
    },
  
    mutations: {
      setCharacter (state, payload) {
        state.character = payload
      },

      setCharacterObj (state, obj) {
        state.characterObj.push(obj)
      },

      setSelectedCharacterId (state, payload) {
        state.selectedCharacterId = payload
      },

      setSelectedCharacter (state, payload) {
        state.selectedCharacter = payload
      }
    },
    actions: {
      fetchCharacter: async ({ commit }) => {
        // debugger
        try {
          const response = await axios.get("https://rickandmortyapi.com/api/character");
  
          if (response.status === 200) {
              console.log(11111, response)
             
              const temp = response.data.results.map(
                (character) => ({
                    label: character.name,
                    id: character.id,
                    img: character.image,
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
  