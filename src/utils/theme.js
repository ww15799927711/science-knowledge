import { ref } from 'vue'

const currentTheme = ref(localStorage.getItem('theme') || 'light')
const currentFont = ref(localStorage.getItem('fontSize') || 'medium')

export function initTheme() {
  applyTheme(currentTheme.value)
  applyFont(currentFont.value)
}

export function useTheme() {
  return {
    currentTheme,
    currentFont,
    fontClass: ref('font-' + currentFont.value),
    setTheme,
    setFontSize
  }
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

function applyFont(size) {
  document.documentElement.classList.remove('font-small', 'font-medium', 'font-large')
  document.documentElement.classList.add('font-' + size)
}

export function setTheme(theme) {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)
  applyTheme(theme)
}

export function setFontSize(size) {
  currentFont.value = size
  localStorage.setItem('fontSize', size)
  applyFont(size)
}
