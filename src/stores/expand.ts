import { defineStore } from 'pinia'
import { ref } from 'vue'

export type expandStatus = 'expand' | 'close'

export const useMyExpandStore = defineStore('myExpandStore', () => {
  const status = ref<expandStatus>('expand')

  const setStatus = (newStatus: expandStatus) => {
    status.value = newStatus
  }

  const toggleStatus = () => {
    if (status.value === 'expand') {
      setStatus('close')
      return
    }
    setStatus('expand')
  }

  return {
    status,
    setStatus,
    toggleStatus,
  }
})
