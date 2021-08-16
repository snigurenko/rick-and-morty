<template lang='pug'>
.message-wrapper
  .title.mobile-change
    span  Send a new message
    
  form.form(@submit.prevent="onSubmit")
    .form-row
      rm-input-title.input-title(
        placeholder='Enter the title'
      )
      
    .form-row
      rm-input-message.input-message(
        placeholder='Enter the message here...'
      )
    
    .form-row
      rm-select(
        label='Character'
        placeholder='Pick a character'
        :options="characterList"
        
      ).select

    .form-row
      .inter-galaxy(@click='checkIntergalaxy')
        .checkbox(:class="{disabled : !InterGalaxy}")
          img(src="../../assets/icons/Checkpoint.svg" v-if="InterGalaxy") 
        span I want to use InterGalaxy Quickpos&trade;
    
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
import InputMessage from '../../components/InputMessage.vue'

export default defineComponent({
  name: "Message",
  components: {
    "rm-select": Select,
    "rm-button": Button,
    "rm-input-title": InputTitle,
    "rm-input-message": InputMessage,
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

    const InterGalaxy = ref(false)
    
    // here will be just 'name' and 'id'
    // and I throw it to the select component as a props
    const characterList = computed(
      () => store.getters['history/getCharacterList']
    )

    const getTitle = computed(()=> store.getters['history/getMessageTitle'])
    const getMessage = computed(()=> store.getters['history/getMessage'])

    const onSubmit = () => {
      const datestamp = DateTime.now().toISO()
      const time = DateTime.fromISO(datestamp).toFormat("HH':'mm")
      const date = DateTime.now().toLocaleString()
      
      const characterObject = {
        title: `${getTitle.value}`,
        message: `${getMessage.value}`,
        date: `${date}`,
        time: `${time}`,
        intergalaxy: `${InterGalaxy.value}`,
        id: `${store.getters['history/getSelectedCharacterId']}`,
      }
      // here I use store, and not set manually localStorage, because of the plugin in root_store
      store.commit('history/setCharacterObj', characterObject)
      router.push({ name: 'History' })
    };

    const checkIntergalaxy = () => {
      InterGalaxy.value = !InterGalaxy.value
    }
    
    return {
      characterList,
      store,
      message,
      onSubmit,
      disabled,
      checkIntergalaxy,
      InterGalaxy,
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
    
    border: solid 1px yellow;

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

      .input-title, .input-message, .select {
        display: block;
        width: 100%;
      }

      .inter-galaxy {
        display: flex;
        flex-flow: row;
        justify-content: start;
        align-items: center;

        width: 100%;
        height: auto;

        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 10px;

        .checkbox {
          display: flex;
          flex-flow: row;
          justify-content: center;
          align-items: center;

          width: 24px;
          height: 24px;

          background-color: var(--app-ui-blue-1);

          border-radius: 4px;

          margin-right: 9px;

          
        }
        .disabled {
          background-color: var(--app-ui-lightgrey);
        }

      }
    }
  }
}

</style>