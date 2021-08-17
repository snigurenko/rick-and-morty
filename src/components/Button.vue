<template lang='pug'>
.button-wrapper
  button.button(
  type="submit"
	:disabled="isButtonDisabled"
  ) {{label}} 
  
</template>

<script>
import { defineComponent, computed, ref, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent ({
  name: 'Button',
  props: {
    label : {
      type: String,
      default: 'Send',
    },
		disabled: {
			type: Boolean,
			default: false,
		},
  },

	setup: () => {
		const store = useStore();
		const isButtonDisabled = ref(true)  
		const selectedCharacterId = computed(() => store.getters['history/getSelectedCharacterId'])
		const messageContent = computed(() => store.getters['history/getMessage'])
		
		const getMsgTitle = computed(() => store.getters['history/getMessageTitle'])

		watchEffect(() => {
			isButtonDisabled.value = ( 
				selectedCharacterId.value === null || getMsgTitle.value.length < 3 || messageContent.value.length < 2
				)
		})

		return {
			isButtonDisabled,
		}
	}

})
</script>
<style scoped lang="scss">
.button-wrapper {
	display: flex;
	flex-flow: row;
	justify-content: flex-end;

	width: 100%;
	height: 100%;

	margin-bottom: 20px;

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
