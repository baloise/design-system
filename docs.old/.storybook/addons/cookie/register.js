import { addons } from '@storybook/addons'

const LOCAL_KEY = 'BaloiseDesignSystemCookieAccepted'

const rIC = callback => {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback)
  } else {
    setTimeout(callback, 32)
  }
}

const showCookieAlert = () => {
  const cookie = document.createElement('div')
  cookie.classList.add('my-cookie')

  const cookieBody = document.createElement('div')
  cookieBody.innerHTML = `
  <strong>Cookie</strong>
  <span>
    We are using cookies to provide you with the best possible user experience and to be
  able to advise you in an optimal way. Further details can be found in ourData <a href="https://www.baloise.ch/en/about-us/information/cookie-policy.html" target="_blank">Privacy Statement</a>.
  </span>
  `

  const cookieOk = document.createElement('button')
  cookieOk.innerText = 'Ok, Got it'
  cookieOk.addEventListener('click', () => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(true))
    cookie.remove()
  })

  cookie.appendChild(cookieBody)
  cookie.appendChild(cookieOk)

  document.body.appendChild(cookie)
}

addons.register('my/cookie', api => {
  rIC(() => {
    const hasAccepted = JSON.parse(localStorage.getItem(LOCAL_KEY))

    if (!hasAccepted) {
      showCookieAlert()
    }
  })
})
