type Callback = (elements: Element[]) => void
export class DragDropSort {
  #el: HTMLElement | undefined
  #callback: Callback

  constructor(callback: Callback) {
    this.#el = undefined
    this.#callback = callback
  }

  isBefore(el: HTMLElement) {
    if (!this.#el) return false
    if (el.parentNode === this.#el.parentNode) {
      for (var cur = this.#el.previousSibling; cur; cur = cur.previousSibling) {
        if (cur === el) return true
      }
    }
    return false
  }

  dragOver(e: DragEvent) {
    e.preventDefault()
    if (!this.#el) return
    const target = e.target as HTMLElement
    if (this.isBefore(target)) {
      target.parentNode?.insertBefore(this.#el, target)
    }
    else {
      target.parentNode?.insertBefore(this.#el, target.nextSibling)
    }
  }

  dragStart(e: DragEvent) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text', '')
      e.dataTransfer.effectAllowed = 'move'
    }
    const target = e.target as HTMLElement
    this.#el = target
  }

  dragEnd(e: DragEvent) {
    if (!this.#el) return
    const elements = Array.from(this.#el.parentNode!.children).filter((el) => (el as HTMLElement).draggable)
    this.#el = undefined
    this.#callback(elements)
  }
}
