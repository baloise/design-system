import { addons } from '@storybook/addons'

const LOCAL_KEY = 'BaloiseDesignSystemMigrationBannerDismissed'

const rIC = callback => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback)
  } else {
    setTimeout(callback, 32)
  }
}

const showMigrationBanner = () => {
  const banner = document.createElement('div')
  banner.classList.add('my-migration-banner')

  banner.innerHTML = `
    <span>
      ⚠️ The Baloise Design System is no longer being developed further. Development has moved to the new
      <a href="https://helvetia-design.vercel.app/" target="_blank" rel="noopener">Helvetia Design System</a>.
      Migration skills will be provided to help with the transition.
    </span>
  `

  const close = document.createElement('button')
  close.setAttribute('aria-label', 'Dismiss')
  close.innerText = '✕'
  close.addEventListener('click', () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(true))
    banner.remove()
  })

  banner.appendChild(close)
  document.body.appendChild(banner)

  rIC(() => {
    const height = `${banner.offsetHeight}px`
    document.body.style.paddingTop = height

    close.addEventListener('click', () => {
      document.body.style.paddingTop = ''
    })
  })
}

addons.register('my/migration', () => {
  rIC(() => {
    const hasDismissed = JSON.parse(localStorage.getItem(LOCAL_KEY))

    if (!hasDismissed) {
      showMigrationBanner()
    }
  })
})
