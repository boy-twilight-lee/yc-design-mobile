<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    :style="{ opacity: disabled && checked ? 0.4 : 1 }"
  >
    <!-- Checked state background -->
    <rect
      v-if="checked"
      x="0.7"
      y="0.7"
      width="12.6"
      height="12.6"
      rx="6.3"
      fill="#0065FF"
      stroke="#0065FF"
      stroke-width="1.4"
    />
    <!-- Unchecked state background -->
    <path
      v-else
      d="M0 7C0 3.13401 3.13401 0 7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7Z"
      :fill="disabled ? '#EDF1F7' : 'white'"
    />
    <!-- Checkmark (visible only when checked) -->
    <path
      v-if="checked"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5399 4.75503C10.8133 5.0284 10.8133 5.47161 10.5399 5.74498L7.03995 9.24498C6.76658 9.51834 6.32336 9.51834 6.05 9.24498L4.3 7.49498C4.02663 7.22161 4.02663 6.7784 4.3 6.50503C4.57336 6.23166 5.01658 6.23166 5.28995 6.50503L6.54497 7.76005L9.55 4.75503C9.82336 4.48166 10.2666 4.48166 10.5399 4.75503Z"
      fill="white"
    />
    <!-- Border (visible only when unchecked) -->
    <path
      v-if="!checked"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.4 7C1.4 10.0928 3.90721 12.6 7 12.6C10.0928 12.6 12.6 10.0928 12.6 7C12.6 3.90721 10.0928 1.4 7 1.4C3.90721 1.4 1.4 3.90721 1.4 7ZM7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0Z"
      fill="#C9CED6"
    />
  </svg>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    disabled?: boolean;
    checked?: boolean;
  }>(),
  {
    disabled: false,
  }
);
</script>
