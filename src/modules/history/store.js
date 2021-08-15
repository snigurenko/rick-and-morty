  import axios from "axios";

  
  const history = {
    namespaced: true,
    state: {
      characterList: [],
      characterObj: [],
      selectedCharacterId: null,
      currentCharacter: null,
    },
    getters: {
      getCharacterList (state) {
        return state.characterList
      },

      getCharacterObj (state) {
        return state.characterObj
      }, 

      getSelectedCharacterId (state) {
        return state.selectedCharacterId
      },

    },
  
    mutations: {
      setCharacterList (state, payload) {
        state.characterList = payload
      },

      setCharacterObj (state, obj) {
        state.characterObj.push(obj)
      },

      setSelectedCharacterId (state, payload) {
        state.selectedCharacterId = payload
      },

    },
    actions: {
      fetchCharacter: async ({ commit }) => {
        // debugger
        try {
          const response = await axios.get("https://rickandmortyapi.com/api/character");
  
          if (response.status === 200) {
            
            // make new array with limited data, potentially if received response will 
            // contain a lot of data, there is no need to pull it through components
            const limitedDataCharacter = response.data.results.map(
                (character) => ({
                    label: character.name,
                    id: character.id,
                })
              )
            commit("setCharacterList", limitedDataCharacter);
          }
        } catch (e) {
          console.log(e.response);
        }
      },
    },
  };

  export default history;
  