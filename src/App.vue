<template lang='pug'>
router-view
</template>

<script>


export default {
  name: 'App',
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
}

#app {
  position: relative;

  min-width: 1024px;

  width: 100%;
  height: 100%;

  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--app-ui-black-10);

  overflow: auto;
}

</style>
