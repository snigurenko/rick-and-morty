<template lang='pug'>
.column
  h1 This is an History page
  .row(v-for="obj in retrievedObject")
    span id: {{obj.id}} title: {{obj.title}}
 
 
  span {{characterList}}
  
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "History",
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

    return {
      retrievedObject,
      characterList,
    }

  }

})
</script>