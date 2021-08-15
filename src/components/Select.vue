<template lang="pug">
.select-wrapper.column
    label {{ label }}
   
    input.input(
      type="text"
      :value="select"
      :placeholder="placeholder"
      @focus="expandCharacterList"
      autocomplete="off"
    )

    .dropdown-content(v-show="showCharacterList")
        .dropdown-item(
            v-for="(option, index) in options"
            :key="index"
             @click="selectCharacter(option)"
        )
            .row.j-between
            span  {{ option.label }}

      
     
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "SelectSearch",
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
        type: String,
        default: "",
    },

    options: {
      type: Array,
      required: true,
    },
  },

  setup: () => {
    const store = useStore();
    
    const isFocused = ref(false);
    const showCharacterList = ref(false)
    const selectImg = ref(null)
    const select = ref('')

    const expandCharacterList = () => {
      showCharacterList.value = true
    }  

     const selectCharacter = (option) =>  {
      //debugger
      selectImg.value = option.img
      select.value = option.label
      showCharacterList.value = false
      store.commit('history/setSelectedCharacterId', selectImg)
    }

    return {
      isFocused,
      showCharacterList,
      expandCharacterList,
      selectCharacter,
      selectImg,
      select,
    };
  },
});
</script>

<style scoped lang="scss">

</style>
