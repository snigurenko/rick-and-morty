<template lang='pug'>
.message-wrapper
  .title
    span  Send a new message
    
  form.form(@submit.prevent="onSubmit")
    .form-row
      rm-input-title.input-title(
        placeholder='Enter the title'
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
      rm-select(
        label='Character'
        placeholder='Pick a character'
        :options="characterList"
        autocomplete="off"
      ).select
    
    .form-row
      rm-button(
        label="Send"
        :disabled="disabled"
      )

</template>

<script>
import { defineComponent, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

import router from "../../router.js";
import { DateTime } from "luxon";

import Select from "../../components/Select.vue"
import Button from "../../components/Button.vue"
import InputTitle from "../../components/InputTitle.vue"

export default defineComponent({
  name: "Message",
  components: {
    "rm-select": Select,
    "rm-button": Button,
    "rm-input-title": InputTitle,
  },
  setup: () => {
    
    // do it now to avoid possible delays in the response from the server side 
    // when opening the select list
    onMounted(()=> {
      store.dispatch('history/fetchCharacter')
    })

    const store = useStore();
   
    const message = ref('')
    const disabled = ref(false)
    
    // here will be just 'name' and 'id'
    // and I throw it to the select component as a props
    const characterList = computed(
      () => store.getters['history/getCharacterList']
    )

    const getTitle = computed(()=> store.getters['history/getMessageTitle'])

    const onSubmit = () => {
      const datestamp = DateTime.now().toISO()
      const time = DateTime.fromISO(datestamp).toFormat("HH':'mm")
      const date = DateTime.now().toLocaleString()
      
      const testObject = {
        title: `${getTitle.value}`,
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
      message,
      onSubmit,
      disabled,
    };
  },
});

</script>

<style scoped lang="scss">
.message-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;

  width: 100%;
  height: auto;

  .title {
    font-style: normal;
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    
    border: solid 1px red;

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

      .input-title {
        display: block;
        width: 100%;
      }

      .select {
        display: block;
        width: 100%;
      }
    }
  }
}

</style>