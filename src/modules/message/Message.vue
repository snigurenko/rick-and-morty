<template lang='pug'>
.message-wrapper
  
  // img(alt="Vue logo" src="../assets/logo.png")
  .title
    span  Send a new message
    
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
          
    
    .form-row
      Select(
        label='Character'
        placeholder='Pick a character'
        :options="characterList"
        autocomplete="off"
      ).select
    
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
    Select,
  },
  setup: () => {
    
    // do it now to avoid possible delays in the response from the server side 
    // when opening the select list
    onMounted(()=> {
      store.dispatch('history/fetchCharacter')
    })

    const store = useStore();

    const title = ref('')
    const message = ref('')
    
    // here will be just 'name' and 'id'
    // and I throw it to the select component as a props
    const characterList = computed(
      () => store.getters['history/getCharacterList']
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
        id: `${store.getters['history/getSelectedCharacterId']}`,
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
    };
  },
});

</script>

<style lang="scss">
.message-wrapper {
  display: flex;
  flex-flow: column;

  width: 100%;
  height: auto;

  .title {
    font-family: Source Sans Pro;
    font-style: normal;
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    

    width: 100%;
    height: 100%;

    .form-row {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;

      &:not(:last-child) {
        margin-bottom: 24px;
      }

      .select {
        display: block;
        width: 100%;
      }
    }
  }
}

</style>