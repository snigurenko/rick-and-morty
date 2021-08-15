<template lang='pug'>
.row
  .column
    // img(alt="Vue logo" src="../assets/logo.png")

    section.form-section
      form.form(@submit.prevent="onSubmit")
        .form-row
          div
            label(for='title') Title
          input(
              id='title'
              type='text'
              v-model='title'
              maxlength="32"
            )
          
        .form-row
          div
            label(for='message') message
          input(
            id='message'
            type='text'
            v-model='message'
            maxlength="256"
          )
        //- .form-row
        //-   div
        //-     label(for='select') select
        //-   input(
        //-     id='select'
        //-     placeholder='select a character'
        //-     v-model='select'
        //-     @focus="expandCharacterList"
        //-     autocomplete="off"
        //-   )
        //-   .dropdown-content(v-show="showCharacterList")
        //-     .dropdown-item(
        //-       @click="selectCharacter(character)"
        //-       v-for="(character, index) in characterList"
        //-       :key="index"
        //-     )
        //-       .row.j-between
        //-         span  {{ character.label }}
              
       
        .form-row
          Select(
            label='Character'
            placeholder='Pick a character'
            :options="characterList"
            autocomplete="off"
          )
        
        .form-row
          button(
            type="submit"
            
          ) Send  

</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

import router from "../../router.js";
import { DateTime } from "luxon";

import Select from "../../components/Select.vue"

export default defineComponent({
  name: "Message",
  components: {
    Select
  },
  setup: () => {
    
    onMounted(()=> {
      store.dispatch('history/fetchCharacter')
    })

    const store = useStore();

    const title = ref('')
    const message = ref('')
  
  
 
    
    const characterList = computed(
      () => store.getters['history/getCharacter']
    ) 

    const tempOBJ = computed(
      () => store.getters['history/getCharacterObj']
    )


    const onSubmit = () => {
      const datestamp = DateTime.now().toISO()
      const time = DateTime.fromISO(datestamp).toFormat("HH':'mm")
      const date = DateTime.now().toLocaleString()
      
      const testObject = {
        title: `${title.value}`,
        message: `${message.value}`,
        date: `${date}`,
        time: `${time}`,
        img: `${store.getters['history/getSelectedCharacterId']}`,
      }
      // here I use store, and not set manually localStorage, because of the plugin in root_store
      store.commit('history/setCharacterObj', testObject)
      router.push({ name: 'History' })
    };
    
    return {
      characterList,
      store,
      title,
      message,
  
   
      onSubmit,
      tempOBJ,
     
  
    };
  },
});

</script>

<style lang="scss">
.label {
      position: absolute;

      display: inline-flex;

      top: 17px;
      left: 13px;

      margin: 0;
      padding-left: 4px;
      padding-right: 4px;

      line-height: 14px;

      background-color: var(--app-ui-bg-white);

      transition: top 0.1s linear;
    }

.form-section {
    position: relative;


    width: 100%;
    height: auto;

    .form {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      .form-row {
        width: 100%;

        &:not(:last-child) {
          margin-bottom: 24px;
        }
      }
    }
  }
</style>