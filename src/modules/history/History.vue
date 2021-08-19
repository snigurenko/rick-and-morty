<template lang='pug'>
.history-wrapper
  .confirmation(v-if='confirmation')
    span Message sent successfully
    img(src='../../assets/icons/IntergalaxyMark.svg' style="margin: 0 5px;")
  .title Message history
  .row(v-if='retrievedObject')

  selected-character(
    v-for="obj, index in retrievedObject.slice().reverse()",
    :obj='obj',
    :key='index'
    ).selected-character

</template>

<script>
import { defineComponent, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";

import SelectedCharacter from '../history/SelectedCharacter.vue'

export default defineComponent({
  name: "History",
  components: {
    "selected-character": SelectedCharacter,
  },
  setup: () => {
    const store = useStore();

    // check if new message was added via length
    onBeforeMount(()=>{
      CharacterObj.value.length > OldObjLength.value
      ? store.commit('history/setMsgSentWell', true)
      : store.commit('history/setMsgSentWell', false)

      store.commit('history/setObjLength', CharacterObj.value.length)
    })

    const OldObjLength = computed(()=> store.getters['history/getObjLength'])
    const CharacterObj = computed(()=> store.getters['history/getCharacterObj'])

    const confirmation = computed(()=> store.getters['history/getMsgSentWell'])

    // Sure it's possible to use imperative method and set localStorage 'by hand',
    // but why, if I can use plugin and project conditions will be complit too
    // example part of the code:
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
      confirmation,
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

  .selected-character:last-child {
    padding-bottom: 32px;
  }

  .title {
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;

    margin-top: 12px;
    margin-bottom: 32px;
  }

  .confirmation {
    font-weight: 300;
    font-size: 32px;
    line-height: 40px;

    color: var(--app-ui-green);

    margin-top: 4px;

    .title{
      font-style: normal;
      font-weight: 300;
      font-size: 32px;
      line-height: 40px;
      margin-top: 12px;
      margin-bottom: 19px;
    }

    img {
      width: 22px;
      height: 18px;
    }
  }

  @media (max-width: 480px) {
    .title {
      width: 100%;

      font-size: 24px;
      line-height: 30px;

      margin: 5px 0 21px;
    }

    .confirmation {
      width: 100%;

      font-size: 24px;
      line-height: 30px;
    }
  }
}
</style>
