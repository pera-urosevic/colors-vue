<script setup lang="ts">
import { colorSelected, hsl, palette, setPalette, unsetColorSelected } from '@/store'
import type { Color } from '@/types'

const add = (color: Color) => {
  const paletteNew = [...palette.value, color]
  setPalette(paletteNew)
}

const remove = (color: Color) => {
  const paletteNew = palette.value.filter((c) => c !== color)
  setPalette(paletteNew)
}

const onSave = async () => {
  const name = prompt('Color Name?')
  if (!name) return
  const colorNew = { name, hsl: hsl.value }
  add(colorNew)
}

const onRemove = async () => {
  if (!colorSelected.value) return
  const confirmed = confirm(`Are you sure you want to remove color "${colorSelected.value.name}"?`)
  if (!confirmed) return
  remove(colorSelected.value)
  unsetColorSelected()
}
</script>

<template>
<div class="actions">
  <button @click="onSave">Add</button>
  <button @click="onRemove" :disabled="!colorSelected">Remove</button>
</div>
</template>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
</style>
