import { randomHSL } from '@/lib/color'
import { load, save } from '@/lib/storage'
import type { Color } from '@/types'
import type { HSL } from 'color-convert/conversions'
import { ref } from 'vue'

export const hsl = ref<HSL>(randomHSL())
export const palette = ref<Color[]>(load())
export const colorSelected = ref<Color | null>(null)
export const fullScreen = ref<boolean>(false)

export const setHSL = (newHSL: HSL) => {
  hsl.value = newHSL
  colorSelected.value = null
}

export const setPalette = (newPalette: Color[]) => {
  palette.value = newPalette
  save(newPalette)
}

export const setColorSelected = (colorNew: Color) => {
  if (colorNew === colorSelected.value) {
    colorSelected.value = null
    hsl.value = randomHSL()
    return
  }
  colorSelected.value = colorNew
  hsl.value = colorNew.hsl
}

export const unsetColorSelected = () => {
  colorSelected.value = null
  hsl.value = randomHSL()
}

export const toggleFullScreen = async () => {
  fullScreen.value = !fullScreen.value
  if (fullScreen.value) {
    await document.documentElement.requestFullscreen()
  } else {
    await document.exitFullscreen()
  }
}
