// as it's a test project, I decided to show how it possible to use Base layout to keep app.vue file simpler 
// purpose id DRY (don't repeat  yourself)

<template lang='pug'>
router-view
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
:root {
  --app-ui-bg-white: #ffffff;
  --app-ui-bg-light: #f5f6f8;

  --app-ui-devider: #ebeff2;

  --app-ui-primary-1: #116cfd;
  --app-ui-primary-1-rgb: #{hexToRGB(#116cfd)};
  --app-ui-primary-2: #0f5fe1;
  --app-ui-primary-3: #0050c0;
  --app-ui-primary-4: #024695;

  --app-ui-secondary-1: #f5fafe;
  --app-ui-secondary-2: #e7f1fd;
  --app-ui-secondary-3: #d4e3fc;
  --app-ui-secondary-4: #c6dcfb;

  --app-ui-grey-1: #fafafb;
  --app-ui-grey-2: #e5e7e9;
  --app-ui-grey-3: #ccd0d4;
  --app-ui-grey-4: #a3aab1;
  --app-ui-grey-5: #66717d;
  --app-ui-grey-6: #334151;
  --app-ui-grey-7: #001226;

  --app-ui-blue-grey-1: #f9f9fb;
  --app-ui-blue-grey-2: #f5f6f9;
  --app-ui-blue-grey-3: #eff0f7;
  --app-ui-blue-grey-4: #e5e7f0;
  --app-ui-blue-grey-5: #d6d8e7;
  --app-ui-blue-grey-6: #cbcddd;
  --app-ui-blue-grey-7: #b9bccf;
  --app-ui-blue-grey-8: #9397ae;

  --app-ui-black-1: #fafafa;
  --app-ui-black-2: #f5f5f5;
  --app-ui-black-3: #eeeeee;
  --app-ui-black-4: #e0e0e0;
  --app-ui-black-5: #bdbdbd;
  --app-ui-black-6: #9e9e9e;
  --app-ui-black-7: #757575;
  --app-ui-black-8: #616161;
  --app-ui-black-9: #424242;
  --app-ui-black-10: #212121;

  --app-ui-red-1: #fef5f5;
  --app-ui-red-2: #f78483;
  --app-ui-red-3: #e4100e;
  --app-ui-red-4: #a40c0a;
  --app-ui-red-5: #640706;

  --app-ui-green-1: #e7f7e8;
  --app-ui-green-2: #8cda93;
  --app-ui-green-3: #2da136;
  --app-ui-green-3-rgb: #{hexToRGB(#2da136)};
  --app-ui-green-4: #26762c;
  --app-ui-green-5: #154219;

  --app-aside-width: 68px;
  --app-aside-width-hovered: 256px;
}

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
  color: #324B72;

  overflow: auto;
}

.row {
  display: flex;
  flex-direction: row;
}

.column {
  display: flex;
  flex-direction: column;
}

</style>
