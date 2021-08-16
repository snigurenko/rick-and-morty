<template lang='pug'>
.input-title-wrapper
	.column(:class="{error: error}")
		label.label(for='title' ) {{label}}
		input.input(
				id='title'
				type='text'
				:placeholder="placeholder"
				v-model='title'
				maxlength="32"
				@keypress="restrictSpecialChars($event)"
				@focusout="onBlur"
			)
		
</template>

<script>
import { defineComponent, onUnmounted, watchEffect, computed, ref } from "vue";
import { useStore } from "vuex";

import useDebounced from "../useDebounced"

const TITLE_VALIDATOR = /^[a-zA-Z0-9]/



export default defineComponent ({
  name: 'input-title',
	props: {
		label: {
			type: String,
			default: 'Title',
		},
		placeholder: {
      type: String,
      default: "",
    },
	},

	setup: () => {
		const store = useStore();

		const restrictSpecialChars = ($event) => {
			$event.charCode === 0 || TITLE_VALIDATOR.test(String.fromCharCode($event.charCode))
			? true
			: $event.preventDefault();
		}

		

		const isTitleValid = computed( ()=> title.value.length > 2) 
		const error = ref(false)

		const onBlur = () => {
			if (isTitleValid.value) {
				error.value = false
				//store.commit('history/setIsTitleError', false)
			} else {
				error.value = true
			
				}
		}

		

		// as an example use useDebounced function imported from root src
		// in ImputMessage do it without, just using input blur
		// here just want to show bouth methods

		const title = useDebounced('', 300)

		

		watchEffect(() => {
			store.commit('history/setMessageTitle', title.value)
			if (title.value.length > 0) {
				onBlur()
			}
		})

		onUnmounted(() => { 
			store.commit('history/setMessageTitle', '')
		});

		return {
			title,
			restrictSpecialChars,
			onBlur,
			error,
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
		margin-bottom: 12px;
  }

	.input {
    @include input;

		&::placeholder {
      color: var(--app-ui-lightgrey);
    }
  }

	.error {
		.input {
			border: solid 1px red;

				&::placeholder {
				color: var(--app-ui-red-1);
				opacity: .4;
			}
		}
		
		color: var(--app-ui-red-1);
	}

}
</style>

