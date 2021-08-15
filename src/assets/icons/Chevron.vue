<template lang="pug">
svg(
  xmlns="http://www.w3.org/2000/svg"
  width="100%"
  height="100%"
  viewBox="0 0 12 8"
  role="presentation"
  :aria-labelledby="iconName"
)
  title(:id="iconName") {{ iconName }}
  g(
    stroke="none"
    fill-rule="evenodd"
    clip-rule="evenodd"
    stroke-linecap="round"
  )
    path(
      d="M0 6L1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6Z"
    )
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: "Chevron",
    },
  },
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;

  outline: none;
}
</style>
