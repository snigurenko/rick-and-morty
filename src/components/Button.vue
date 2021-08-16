<template lang='pug'>
.button-wrapper
  button.button(
  type="submit"
	:disabled="isButtonDisabled"
  ) {{label}} 
  
</template>

<script>
import { defineComponent, computed, ref, watchEffect, onMounted } from "vue";
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

		onMounted(()=>{
			console.log('selectedCharacterId', selectedCharacterId)
			console.log('getMessageTitle', getMsgTitle)
			console.log('messageContent', messageContent)
		})
		watchEffect(() => {
			//debugger
			if ( selectedCharacterId.value === null || getMsgTitle.value.length < 3 || messageContent.value.length < 2) {
				isButtonDisabled.value = true
			} else {isButtonDisabled.value = false}
			
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
