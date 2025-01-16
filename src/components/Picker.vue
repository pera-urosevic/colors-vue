<script setup lang="ts">
import { computed, ref } from 'vue'
import convert from 'color-convert'
import { bgColorHSL } from '@/lib/style'
import type { HEX, HSL, RGB } from 'color-convert/conversions'
import InputHSL from '@/components/inputs/colors/InputHSL.vue'
import InputRGB from '@/components/inputs/colors/InputRGB.vue'
import InputHEX from '@/components/inputs/colors/InputHEX.vue'
import { hsl, setHSL, toggleFullScreen } from '@/store'

const rgb = computed<RGB>(() => convert.hsl.rgb(hsl.value))
const hex = computed<HEX>(() => convert.hsl.hex(hsl.value))

const onHSL = (newHSL: HSL) => {
  setHSL(newHSL)
}

const onRGB = (newRGB: RGB) => {
  const newHSL: HSL = convert.rgb.hsl(newRGB)
  setHSL(newHSL)
}

const onHEX = (newHEX: HEX) => {
  const newHSL: HSL = convert.hex.hsl(newHEX)
  setHSL(newHSL)
}
</script>

<template>
  <div class="picker">
    <button class="preview" :style="bgColorHSL(hsl)" @click="toggleFullScreen"></button>
    <div class="controls">
      <div class="format">
        <div class="name">HSL</div>
        <InputHSL :value="hsl" @input="onHSL" />
      </div>
      <div class="format">
        <div class="name">RGB</div>
        <InputRGB :value="rgb" @input="onRGB" />
      </div>
      <div class="format">
        <div class="name">HEX</div>
        <InputHEX :value="hex" @input="onHEX" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 12px;
}
.preview {
  width: 320px;
  height: 160px;
  border-radius: 6px;
  border: none;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.format {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 12px;
  .name {
    width: 40px;
  }
}
input[type='color'] {
  cursor: pointer;
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
