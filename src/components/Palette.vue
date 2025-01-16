<script setup lang="ts">
import { bgColorHSL } from '@/lib/style'
import { palette, setColorSelected, setPalette } from '@/store'
import { DragDropSort } from '@/lib/sort'

const dds = new DragDropSort((elements) => {
  const newPalette = elements.map((el) => {
    const name = el.getAttribute('title')!
    const color = palette.value.find((c) => c.name === name)!
    return color
  })
  setPalette(newPalette)
})
</script>

<template>
  <div class="palette">
    <div
      class="color"
      draggable="true"
      v-for="color in palette"
      :key="color.name"
      :title="color.name"
      :style="bgColorHSL(color.hsl)"
      @click="setColorSelected(color)"
      @dragstart="dds.dragStart"
      @dragover="dds.dragOver"
      @dragend="dds.dragEnd"
    ></div>
  </div>
</template>

<style scoped>
.palette {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: start;
  gap: 16px;
}
.color {
  width: 96px;
  height: 48px;
  border-radius: 8px;
  border: 1px solid var(--color-dark);
  cursor: pointer;
}
</style>
