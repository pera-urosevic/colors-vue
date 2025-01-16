<script setup lang="ts">
const props = defineProps<{
  value: number
  title: string
  min?: number
  max?: number
  step?: number
  width?: number
}>()

const min = props.min ?? 0
const max = props.max ?? 100
const step = props.step ?? 1
const width = props.width ?? 64

const emit = defineEmits(['input'])

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('input', Number(value))
}
</script>

<template>
  <input
    class="input-number"
    type="number"
    :min="min"
    :max="max"
    :step="step"
    :value="props.value"
    :title="props.title"
    @input="onInput"
    :style="{ width: `${width}px` }"
  />
</template>

<style scoped>
.input-number {
  text-align: right;
  font-size: 18px;
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
