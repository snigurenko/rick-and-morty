<template lang='pug'>
.home
  // img(alt="Vue logo" src="../assets/logo.png")
  span Message page {{characterList}}
  button(@click='fetch')
    span fetch
  
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";



export default defineComponent({
  name: "Message",
  setup: () => {
    const store = useStore();

  
    
    const characterList = computed(
      () => store.getters['history/getCharacter']
    ) 
  
    
    
    return {
      characterList,
      store,
      fetch: () => {
        store.dispatch('history/fetchCharacter')
      },
    };
  },
});

</script>