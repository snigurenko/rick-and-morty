  import axios from "axios";
  
  const history = {
    namespaced: true,
    state: {
      characterList: [],
      characterObj: [],
      selectedCharacterId: null,
      currentCharacter: null,
      messageTitle: '',
      message: '',
      objLength: null,
      msgSentWell: false,
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
      getMessageTitle (state) {
        return state.messageTitle
      },
      getMessage (state) {
        return state.message
      },
      getObjLength (state) {
        return state.objLength
      },
      getMsgSentWell (state) {
        return state.msgSentWell
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
      setMessageTitle (state, payload) {
        state.messageTitle = payload
      },
      setMessage (state, payload) {
        state.message = payload
      },
      setObjLength(state, payload) {
        state.objLength = payload
      },
      setMsgSentWell(state, payload) {
        state.msgSentWell = payload
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
  