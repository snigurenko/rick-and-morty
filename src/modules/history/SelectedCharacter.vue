<template lang='pug'>
.selected-history-wrapper
  transition(name="fade" mode="out-in")
    .history-item(
      @click="changeToogle"
      :class="{ active: toogle}"
      )
      .item-title
        span {{obj.title}}
        img(
          alt="Chevron"
          src="../../assets/icons/Chevron.svg"
          :class="{ rotate: toogle, chevron: !toogle }"
        )
      .item-content(v-if="toogle && currentCharacter")
        .details
          .char-img
            img(:src="currentCharacter.image")
          .char-details
            span Sent to: {{currentCharacter.name}}
            span Date: {{obj.date}}
            span At: {{obj.time}}
          .quickpost(v-if="intergalaxy")
            img(src="../../assets/icons/IntergalaxyMark.svg" style="margin: 0 5px;")
            span Using Quickpost&trade;
        .message
          span {{obj.message}}

</template>

<script>
import { defineComponent, ref, computed } from "vue";

import axios from "axios";

export default defineComponent({
  name: "SelectedCharacter",
  props: {
    obj: {
      type: Object,
      requered: true,
    }
  },
  setup: (props) => {
    const toogle = ref(false)
    const currentCharacter = ref(null)

    const intergalaxy = computed(()=> props.obj.intergalaxy === 'true' ? true : false)

    const changeToogle = () => {

      !toogle.value
      ? fetchCurrentCharacter(props.obj.id)
      : currentCharacter.value = {}

      toogle.value = !toogle.value
    }

    // potentially this function can be moved to direct store, but there is no need to do it now
    const fetchCurrentCharacter = async (id) => {
      const url = `https://rickandmortyapi.com/api/character/${id}`
      try {
        const response = await axios.get(url);
          if (response.status === 200) {
            currentCharacter.value = response.data
          }
        } catch (e) {
          console.log(e.response);
        }
      }

    return {
      changeToogle,
      toogle,
      currentCharacter,
      intergalaxy,
    }
  }
})
</script>

<style scoped lang="scss">
.selected-history-wrapper {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;

  .history-item {
    display: flex;
    flex-direction: column;
    justify-content: center;

    width: 100%;
    height: 50px;

    border-bottom: solid 1px var(--app-ui-lightgrey);

    .item-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      width: 100%;
      height: 50px;

      font-weight: 600;
      font-size: 14px;
      line-height: 18px;

      img {
        width: 12px;
        height: 12px;
      }
    }

    .item-content {
      padding-top: 3px;
      padding-bottom: 20px;

      .details {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        width: 100%;
        height: auto;

        .char-img {
          border-left: solid 1px var(--app-ui-grey-3);

          padding: 0 6px;

          img {
            width: 48px;
            height: 48px;

            border-radius: 50%;
          }
        }

        .char-details {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          width: 100%;
          height: 48px;

          font-size: 14px;
          line-height: 10px;
        }

        .quickpost {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;

          width: 100%;
        }
      }

      .message {
        margin-top: 21px;

        font-size: 16px;
        line-height: 20px;
      }
    }
  }

  .active {
    height: 100%;
  }

  .chevron, .rotate  {
    position: relative;

    display: block;

    pointer-events: none;

    transform: rotate(180deg);
    transition: transform 0.5s ease;
  }

  .rotate {
    transition: transform 0.5s ease;
    transform: rotate(360deg);
  }

}
</style>
