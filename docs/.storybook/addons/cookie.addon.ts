const LOCAL_KEY = 'DesignSystemCookieAccepted'

const rIC = (callback: () => void) => {
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
  able to advise you in an optimal way. Further details can be found in ourData <a href="https://www.helvetia-baloise.com/corporate/hb/en/home/about-us/contact/privacy.html" target="_blank">Privacy Statement</a>.
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

// addons.register('my/cookie', api => {
export const registerCookie = () => {
  rIC(() => {
    const hasAccepted = JSON.parse(localStorage.getItem(LOCAL_KEY) || 'false')

    if (!hasAccepted) {
      showCookieAlert()
    }
  })
}
