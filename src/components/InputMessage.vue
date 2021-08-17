<template lang='pug'>
.input-title-wrapper
	.column(:class="{error: false}")
		label.label(for='message' ) {{label}}
		textarea.input(
			id='message'
			type='text'
			:placeholder="placeholder"
			v-model='message'
			maxlength="256"
			@keyup="onKeyUp"
			autocomplete="off"
		)
		
</template>

<script>
import { defineComponent, ref, onUnmounted, onBeforeMount } from "vue";
import { useStore } from "vuex";



export default defineComponent ({
  name: 'input-message',
	props: {
		label: {
			type: String,
			default: 'Message',
		},
		placeholder: {
      type: String,
      default: "",
    },
	},

	setup: () => {

		onBeforeMount(()=>{
			store.commit('history/setMessage', '')
		})
		
		const message = ref('')

		const store = useStore();

		onUnmounted(() => { 
			store.commit('history/setMessageTitle', '')
		});

		const onKeyUp = () => {
			store.commit('history/setMessage', message.value)
		}

		return {
			message,
			onKeyUp,
		}
	}	

})
</script>
<style scoped lang="scss">
@import '../styles/mixin.scss';

.input-title-wrapper {
	position: relative;

	display: flex;
	flex-flow: row;
	
	width: 100%;
	height: auto;

	.label {
		font-size: 16px;
		line-height: 20px;
		margin-bottom: 10px;
  }

	.input {
    @include input;

		align-items: flex-start;

		height: 140px;

		font-family: Source Sans Pro;
		font-style: normal;
		font-weight: normal;
		font-size: 14px;
		line-height: 18px;
	
    overflow-y: auto;
		padding-top: 9px;

		resize: none;

		&::placeholder {
			position: absolute;
			top: 8px;

			display: flex;
			flex-direction: row;
			justify-content: flex-start;

			color: var(--app-ui-lightgrey);
		}
	}

	.error {
		.input {
			border: solid 1px red;

				&::placeholder {
				color: red;
			}
		}
		
		color: red;
	}

	@media (max-width: 480px) {
    @include media-label;
  }

}
</style>

