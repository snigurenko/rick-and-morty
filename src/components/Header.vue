<template lang='pug'>
.header-wrapper
  .navigation
    img.img(src="../assets/rick_morty.svg")
    .menu-items
      .item(
        @click="pushItem('Message')"
        :class="{active: currentRoute === 'Message'}"
      )
        span New message

      .item(
        @click="pushItem('History')"
        :class="{active: currentRoute === 'History'}"
      )
        span History
  .line
  
  
</template>

<script>
import { defineComponent, computed } from "vue";
import router from "../router.js";

export default defineComponent({
  name: 'Header',
  setup: () => {
    const currentRoute = computed(()=> router.currentRoute.value.name)

    const pushItem = (value) => {
      router.push({ name: `${value}` })
    }

    return {
      pushItem,
      currentRoute,
    }
  }

})
</script>
<style scoped lang="scss">
.header-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: auto;


  .img {
    margin: 16px 0 16px 20px;
  }
 
  .row {
    width: 100%;

    justify-content: center;

  }
  
  .navigation {
    display: flex;
    flex-flow: row;
    align-items: flex-end;
    justify-content: space-between;

    width: 100%;
    max-width: 996px;
    min-width: 380px;
    height: auto;

    padding: 0 1px;

    .menu-items {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;

      width: 100%;

      margin-right: -74px;

      .item{
        background-color: var(--app-ui-bg-white);
        color: var(--app-ui-darkblue);

        padding: 6px 16px;
        margin-top: 32px;
        
        // I know that it is not a good practice to use 'all' 
        // but here a smal component and I used scoped and scss, so no worry
        // I am sensetive for that if what :) 
        transition: all 0.1s ease;
      }

      .active {
        background-color: var(--app-ui-blue-1);
        color: var(--app-ui-bg-white);

        transition: all 0.3s ease;
        
      }
    }

    @media (max-width: 1160px) {
      .menu-items {
         margin-right: 20px;
         margin-bottom: -1px;
      }
    }
  }

  .line {
    width: 100%;
    height: 24px;
    min-width: 380px;

    background-color: var(--app-ui-blue-1);
  }

  @media (max-width: 480px) {
    .img {
      width: 110px;
      height: 32px;
    }
  }
}
</style>