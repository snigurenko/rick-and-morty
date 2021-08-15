<template lang='pug'>
.column
  div(@click="changeToogle")
    div obj: {{obj.title}}
  div(v-if="toogle")
    span {{obj}}
   
  
</template>

<script>
import { defineComponent, ref } from "vue";


export default defineComponent({
  name: "SelectedCharacter",
  props: {
    obj: {
      type: Object,
      
    }
  },
  setup: () => {
    const toogle = ref(false)

    const changeToogle = () => {
      toogle.value = !toogle.value
    }

    return {
      changeToogle,
      toogle,
    }

  }

})
</script>