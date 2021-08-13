<template lang="pug">
.hc-input(:class="inputClass")
  .wrapper
    template(v-if="label")
      label.label(:for="id") {{ label }}
    input.input(
      :id="id"
      type="text"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="focusCallback"
      @blur="blurCallback"
    )
    .error-msg(v-if="errorMsg !== '' && isError") {{ errorMsg }}
    i.reset-icon(
      tabindex="0"
      v-if="withReset && value"
      @keyup.enter="onReset"
      @click="onReset"
    )
      hc-icon-plus(iconName="Reset")
    i.validation-icon(
      tabindex="0"
      v-if="isValid && !isError"
    )
      span.divider
      hc-icon-checkmark-circle(iconName="Zapisane")
    i.error-icon(
      tabindex="0"
      v-if="isError"
    )
      span.divider
      hc-icon-error-circle(iconName="Blęd")
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    value: {
      type: String,
      default: "",
    },
    withReset: {
      type: Boolean,
      default: false,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    isError: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup: (props) => {
    const isInputFocused = ref(false);
    const id = ref("hc_" + Math.random().toString(36).substr(2, 9));

    const inputClass = computed(() => [
      isInputFocused.value && "focused",
      props.value && "filled",
      props.withReset && "with-reset-icon",
      props.isValid && "with-valid-icon",
      props.disabled && "disabled",
      props.isError && "is-error",
    ]);

    const setFocused = (val: boolean) => (isInputFocused.value = val);

    const focusCallback = (e: Event & { target: HTMLInputElement }) => {
      setFocused(true);
      props.onFocus(e);
    };

    const blurCallback = (e: Event & { target: HTMLInputElement }) => {
      setFocused(false);
      props.onBlur(e);
    };

    return {
      id,
      inputClass,
      setFocused,
      blurCallback,
      focusCallback,
    };
  },
});
</script>


<style scoped lang="scss">
.hc-input {
  display: flex;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 48px;

  .wrapper {
    position: relative;

    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: baseline;

    .input,
    .label {
      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 22px;
      color: var(--app-ui-black-8);
    }

    .label {
      position: absolute;

      display: inline-flex;

      top: 17px;
      left: 13px;

      margin: 0;
      padding-left: 4px;
      padding-right: 4px;

      line-height: 14px;

      background-color: var(--app-ui-bg-white);

      transition: top 0.1s linear;
    }

    .input {
      display: inline-flex;

      width: 100%;
      height: 48px;

      margin: 0;
      padding: 16px;

      border: 1px solid var(--app-ui-grey-3);
      outline: none;
      border-radius: 8px;

      outline: none;

      background-color: var(--app-ui-bg-white);

      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .error-msg {
      padding: 4px 16px;

      font-family: "Open Sans", sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;

      color: var(--app-ui-red-3);
    }

    .reset-icon {
      position: absolute;

      display: inline-flex;

      width: 24px;
      height: 24px;

      right: 13px;
      top: 12px;

      border: 0;
      border-radius: 4px;
      outline: none;

      background-color: transparent;

      stroke: var(--app-ui-grey-7);

      transition: background-color 0.3s linear;

      cursor: pointer;

      > svg {
        transform: rotate(45deg);
      }

      &:hover {
        background-color: var(--app-ui-grey-2);
      }

      &:active,
      &:focus {
        background-color: var(--app-ui-grey-3);
      }
    }

    .validation-icon {
      position: absolute;

      display: inline-flex;
      align-items: center;
      justify-content: space-between;

      width: 30px;
      height: 24px;

      right: 13px;
      top: 12px;

      border: 0;
      border-radius: 4px;
      outline: none;

      background-color: transparent;

      fill: var(--app-ui-primary-1);

      .divider {
        display: inline-flex;

        height: 18px;
        width: 1px;

        background-color: var(--app-ui-grey-3);
      }

      > svg {
        width: 20px;
        height: 20px;

        margin: 0;
      }
    }

    .error-icon {
      position: absolute;

      display: inline-flex;
      align-items: center;
      justify-content: space-between;

      width: 32px;
      height: 24px;

      right: 11px;
      top: 12px;

      border: 0;
      border-radius: 4px;
      outline: none;

      background-color: transparent;

      fill: var(--app-ui-red-3);

      .divider {
        display: inline-flex;

        height: 18px;
        width: 1px;

        background-color: var(--app-ui-grey-3);
      }

      > svg {
        width: 24px;
        height: 24px;
      }
    }
  }

  &:hover {
    .wrapper {
      .input {
        border: 1px solid var(--app-ui-grey-6);
      }
    }
  }

  &.focused {
    .wrapper {
      .label {
        top: -7px;
        color: var(--app-ui-primary-1);
      }

      .input {
        color: var(--app-ui-black-10);

        border: 1px solid var(--app-ui-primary-1);
        box-shadow: 0 0 0 1px var(--app-ui-primary-1);
      }
    }
  }

  &.filled {
    .wrapper {
      .label {
        top: -7px;
      }

      .input {
        color: var(--app-ui-black-10);
      }
    }
  }

  &.is-error {
    .wrapper {
      .label {
        color: var(--app-ui-red-3);
      }

      .input {
        color: var(--app-ui-red-3);

        border: 1px solid var(--app-ui-red-3);
        box-shadow: 0 0 0 1px var(--app-ui-red-3);
      }
    }
  }

  &.disabled {
    cursor: not-allowed;

    .wrapper {
      .label,
      .input {
        color: (--app-ui-grey-5);
      }

      .input {
        background-color: var(--app-ui-grey-1);
      }
    }
  }

  &.with-reset-icon {
    .wrapper {
      .input {
        padding: 16px 40px 16px 16px;
      }
    }
  }

  &.with-valid-icon {
    .wrapper {
      .input {
        padding: 16px 78px 16px 16px;
      }

      .reset-icon {
        right: 48px;
      }
    }
  }
}
</style>
