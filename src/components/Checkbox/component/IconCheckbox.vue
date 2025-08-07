<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="indeterminate && !disabled ? 15 : 14"
    :height="indeterminate && !disabled ? 15 : 14"
    :viewBox="indeterminate && !disabled ? '0 0 15 15' : '0 0 14 14'"
    fill="none"
    :style="{ opacity: disabled ? 0.4 : 1 }"
  >
    <!-- Background/Container -->
    <path
      v-if="!checked && !indeterminate"
      d="M0.299988 4.3C0.299988 2.09087 2.09085 0.300003 4.29999 0.300003H9.69999C11.9091 0.300003 13.7 2.09086 13.7 4.3V9.7C13.7 11.9091 11.9091 13.7 9.69999 13.7H4.29999C2.09085 13.7 0.299988 11.9091 0.299988 9.7V4.3Z"
      :fill="disabled ? '#EDF1F7' : 'white'"
    />
    <rect
      v-else
      :x="indeterminate && !disabled ? '1.49492' : '0.995349'"
      :y="indeterminate && !disabled ? '1.53984' : '0.995349'"
      width="12"
      height="12"
      rx="3.3"
      fill="#0065FF"
      stroke="#0065FF"
      stroke-width="1.4"
    />
    <!-- Border (for unchecked state) -->
    <path
      v-if="!checked && !indeterminate"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.69999 1.7H4.29999C2.86405 1.7 1.69999 2.86406 1.69999 4.3V9.7C1.69999 11.1359 2.86405 12.3 4.29999 12.3H9.69999C11.1359 12.3 12.3 11.1359 12.3 9.7V4.3C12.3 2.86406 11.1359 1.7 9.69999 1.7ZM4.29999 0.300003C2.09085 0.300003 0.299988 2.09087 0.299988 4.3V9.7C0.299988 11.9091 2.09085 13.7 4.29999 13.7H9.69999C11.9091 13.7 13.7 11.9091 13.7 9.7V4.3C13.7 2.09086 11.9091 0.300003 9.69999 0.300003H4.29999Z"
      fill="#C9CED6"
    />
    <!-- Checkmark or Indeterminate line -->
    <path
      v-if="checked"
      d="M4.8125 7L6.5625 8.75L10.0625 5.25"
      stroke="white"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      v-else-if="indeterminate"
      :d="disabled ? 'M4.5 7H9.5' : 'M5 7.54492H10'"
      stroke="white"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
  }>(),
  {
    disabled: false,
    checked: false,
    indeterminate: false,
  }
);
</script>
