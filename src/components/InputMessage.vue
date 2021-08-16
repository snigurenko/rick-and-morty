<template lang='pug'>
.input-title-wrapper
	.column(:class="{error: false}")
		label.label(for='message' ) {{label}}
		input.input(
			id='message'
			type='text'
			:placeholder="placeholder"
			v-model='message'
			maxlength="256"
		)
		
</template>

<script>
import { defineComponent, ref, watchEffect, onUnmounted } from "vue";
import { useStore } from "vuex";

export default defineComponent ({
  name: 'input-message',
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
		const message = ref('')

		const store = useStore();

		watchEffect(() => {
			
			store.commit('history/setMessageTitle', message.value)
			return
		})

		onUnmounted(() => { 
			store.commit('history/setMessageTitle', '')
		});

		return {
			message,
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

