<template lang='pug'>
.column
  div(@click="changeToogle")
    div obj: {{obj.title}}
  div(v-if="toogle")
    span {{obj}}
    span {{currentCharacter}}
   
  
</template>

<script>
import { defineComponent, ref } from "vue";


import axios from "axios";


export default defineComponent({
  name: "SelectedCharacter",
  props: {
    obj: {
      type: Object,
      
    }
  },
  setup: (props) => {
    const toogle = ref(false)
    const currentCharacter = ref(null)

    const changeToogle = () => {
      toogle.value = !toogle.value
      toogle.value
      ? fetchCurrentCharacter(props.obj.id)
      : currentCharacter.value = null
    }

    // potentially this function can be moved to direct store, but there is no need to do it now
    const fetchCurrentCharacter = async (id) => {
        console.log('run')
        const url = `https://rickandmortyapi.com/api/character/${id}`
        try {
            const response = await axios.get(url);
    
            if (response.status === 200) {
                currentCharacter.value = response.data
            }
          } catch (e) {
            console.log(e.response);
          }
      }

    return {
      changeToogle,
      toogle,
      currentCharacter,
    }
  }
})
</script>