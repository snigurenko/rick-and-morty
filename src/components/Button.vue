<template lang='pug'>
.button-wrapper
  button.button(
  type="submit"
	:disabled="disabled"
  ) {{label}} 
  
</template>

<script>

export default {
  name: 'Button',
  props: {
    label : {
      type: String,
      default: 'Send',
    },
		disabled: {
			type: Boolean,
			default: false,
		}
  }
}
</script>
<style scoped lang="scss">
.button-wrapper {
	display: flex;
	flex-flow: row;
	justify-content: flex-end;


	width: 100%;
	height: auto;

	.button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;

		width: 82px;
		height: 40px;

		cursor: pointer;

		font-family: Source Sans Pro;
		font-style: normal;
		font-weight: normal;
		font-size: 16px;
		line-height: 20px;

		border-radius: 20px;

		border: none;

		color: var(--app-ui-bg-white-1);

		background-color: var(--app-ui-blue-1);
		
		&:active {
			background-color: var(--app-ui-blue-2);
		}
		

		&:disabled {
			background-color: lightgrey;
		}
	}


	
}


</style>
