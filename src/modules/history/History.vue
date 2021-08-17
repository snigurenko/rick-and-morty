<template lang='pug'>
.history-wrapper
  .title Message history
  .row(v-if='retrievedObject')
    
  selected-character(
      v-for="obj, index in retrievedObject.slice().reverse()",
      :obj='obj',
      :key='index'
      )

</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import SelectedCharacter from '../history/SelectedCharacter.vue'

export default defineComponent({
  name: "History",
  components: {
    "selected-character": SelectedCharacter,
  },
  setup: () => {
    const store = useStore();
  
    // Sure it's possible to use imperative method and set localStorage 'by hand', 
    // but why, if I can use plugin and project conditions will be complit too
    
    // onMounted(()=> {
    //   // const temp  = localStorage.getItem('testObject')
    //   // retrievedObject.value = JSON.parse(temp)
    // })

    // let retrievedObject = ref({})

    const retrievedObject = computed(
        ()=> store.getters['history/getCharacterObj']
    )

    return {
      retrievedObject,
    }
  }
})
</script>

<style scoped lang="scss">
.history-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  .title {
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;

    margin: 32px 0 50px;
  }
}
</style>