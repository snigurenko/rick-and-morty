<template lang='pug'>
.column
  h1 This is an History page
  .row(v-if='retrievedObject')
    
  selected-character(
      v-for="obj in retrievedObject",
      :obj='obj',
      :key='obj.id'
      )

</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import SelectedCharacter from '../history/SelectedCharacter.vue'

export default defineComponent({
  name: "Hiatory",
  components: {
    "selected-character": SelectedCharacter,
  },
  setup: () => {
    const store = useStore();
  

    // Sure it 's possible to use imperative method and set localStorage 'by hand', 
    // but why, if I can use plugin and project conditions will be complit too
    // as example below
    
    // onMounted(()=> {
    //   // const temp  = localStorage.getItem('testObject')
    //   // retrievedObject.value = JSON.parse(temp)
    // })

    // let retrievedObject = ref({})

     const retrievedObject = computed(
        ()=> store.getters['history/getCharacterObj']
      )

    const characterList = computed(
      () => store.getters['history/getCharacter']
    )

    const getHistory = (id) => {
      store.dispatch('history/selectedCharacter', id)
    }

    const SelectedCharacter = computed(
      () => store.getters['history/getSelectedCharacter']
    )

  

    return {
      retrievedObject,
      characterList,
      getHistory,
      SelectedCharacter,
    
    }

  }

})
</script>