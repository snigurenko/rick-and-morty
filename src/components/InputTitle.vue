<template lang='pug'>
.input-title-wrapper
	.column(:class="{error: false}")
		label.label(for='title' ) {{label}} 
		input.input(
				id='title'
				type='text'
				:placeholder="placeholder"
				v-model='title'
				maxlength="32"
			
			)
		
</template>

<script>
import { defineComponent, onUnmounted, watchEffect } from "vue";
import { useStore } from "vuex";

import useDebounced from "../useDebounced"



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
		const title = useDebounced('', 400)

		const store = useStore();

		watchEffect(() => store.commit('history/setMessageTitle', title.value))

		onUnmounted(() => { 
			store.commit('history/setMessageTitle', '')
		});

		return {
			title,
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
				color: red;
			}
		}
		
		color: red;
	}

}
</style>

