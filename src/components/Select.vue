<template lang="pug">
.select-wrapper
  .column
    label.label {{ label }}
    
    // usually I prefere put img via components, it is easier to set if needed
    // I tried do so with export svg chevron pic from figma, but result was wrong, 
    // so I just put svg via img src
    // leave comented example here in template and script
    
    //   icon-chevron(:iconName="Chevron")
    img(
      alt="Chevron" 
      src="../assets/icons/Chevron.svg"
      :class="{ rotate: showCharacterList, chevron: !showCharacterList }"
    )
       

    input.input(
      type="text"
      :value="selectedLabel"
      :placeholder="placeholder"
      @focus="expandCharacterList"
      :class="{ active: showCharacterList }"
      autocomplete="off"
      readonly="readonly"
    )

    transition(name="fade" mode="out-in")
      .dropdown-content(v-if="showCharacterList")
        .dropdown-item(
            v-for="(option, index) in options"
            :key="index"
            @click="selectCharacter(option)"
        )
            .row
            span  {{ option.label }}

      
     
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

// import IconChevron from '../assets/icons/Chevron.vue'

export default defineComponent({
  name: "SelectSearch",
//   components: {
//     "icon-chevron": IconChevron,
//   },
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
    
    const showCharacterList = ref(false)
    const selectedLabel = ref('')

    const expandCharacterList = () => {
      showCharacterList.value = true
    }

    const selectCharacter = (option) =>  {
      selectedLabel.value = option.label
      showCharacterList.value = false
      store.commit('history/setSelectedCharacterId', option.id)
    }

    return {
      showCharacterList,
      expandCharacterList,
      selectCharacter,
      selectedLabel,
    };
  },
});
</script>

<style scoped lang="scss">
.select-wrapper {
  position: relative;

  width: 100%;
  max-width: 460px;
  height: auto;

  font-style: normal;
  font-weight: 400;

  .label {
    font-size: 16px;
    line-height: 20.11px;
  }
  
  .input {
    display: inline-flex;

    width: 100%;
    height: 34px;

    margin-top: 13px; 
    padding: 0 16px;

    font-size: 14px;
    line-height: 18px;

    border: 1px solid var(--app-ui-lightgrey);

    cursor: not-allowed;
    outline: none;
    
    border-radius: 8px;

    background-color: var(--app-ui-bg-white);

    color: var(--app-ui-darkblue);

    &::placeholder {
      color: var(--app-ui-darkblue);
      font-family: Source Sans Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 18px;
    }
  }

  .dropdown-content {
    width: 100%;
    max-height: 138px;

    overflow-y: auto;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;

    border-radius: 0 0 8px 8px;

    border: solid 1px var(--app-ui-lightgrey);

    .dropdown-item {
      display: flex;
      align-items: center;

      padding: 0 16px;
      
      width: 100%;
      height: 34px;

      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--app-ui-grey-1);
        transition: background-color 0.3s ease;
      }
    }
  }
  
  .chevron, .rotate  {
    position: absolute;

    display: block;

    top: 46px;
    right: 17px;

    pointer-events: none;

    transform: rotate(180deg);
    transition: transform 0.5s ease;
  } 
  
  .rotate {
    transition: transform 0.5s ease;
    transform: rotate(360deg);
  }

  .active {
    border-radius: 8px 8px 0 0;
    border-bottom: none;
    height: 33px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}

</style>
