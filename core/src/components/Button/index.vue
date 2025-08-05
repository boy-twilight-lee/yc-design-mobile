<template>
  <button
    :class="[
      'varco-button',
      `varco-button--${type}`,
      `varco-button--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-disabled': disabled,
        'is-loading': loading,
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="varco-button__loading-icon">⏱</span>
    <span class="varco-button__text">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

export type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'medium' | 'small'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  disabled?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'click', val: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  plain: false,
  round: false,
  disabled: false,
  loading: false
})

const emit = defineEmits<Emits>()

const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) {
    evt.preventDefault()
    return
  }
  emit('click', evt)
}
</script>

<style scoped>
.varco-button {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  cursor: pointer;
  transition: 0.1s;
  outline: none;
}

.varco-button:hover {
  background-color: #ecf5ff;
  color: #409eff;
  border-color: #c6e2ff;
}

.varco-button:active {
  transform: translateY(1px);
}

.varco-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.varco-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.varco-button--success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}

.varco-button--success:hover {
  background-color: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

.varco-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}

.varco-button--warning:hover {
  background-color: #ebb563;
  border-color: #ebb563;
  color: #fff;
}

.varco-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.varco-button--danger:hover {
  background-color: #f78989;
  border-color: #f78989;
  color: #fff;
}

/* Plain buttons */
.varco-button--primary.is-plain {
  color: #409eff;
  background: #ecf5ff;
  border-color: #b3d8ff;
}

.varco-button--success.is-plain {
  color: #67c23a;
  background: #f0f9ec;
  border-color: #c2e7b0;
}

.varco-button--warning.is-plain {
  color: #e6a23c;
  background: #fdf6ec;
  border-color: #f5dab1;
}

.varco-button--danger.is-plain {
  color: #f56c6c;
  background: #fef0f0;
  border-color: #fbc4c4;
}

/* Sizes */
.varco-button--large {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 6px;
}

.varco-button--small {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 2px;
}

/* Round button */
.varco-button.is-round {
  border-radius: 20px;
}

/* Disabled button */
.varco-button.is-disabled,
.varco-button.is-disabled:hover,
.varco-button.is-disabled:active {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}

/* Loading button */
.varco-button.is-loading {
  cursor: not-allowed;
  position: relative;
}

.varco-button__loading-icon {
  margin-right: 4px;
}
</style>