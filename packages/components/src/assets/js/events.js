const events = ['balChange', 'balInput', 'balBlur', 'balFocus', 'balNavigate', 'balClick', 'balKeyPress', 'balCancel']
for (let index = 0; index < events.length; index++) {
  const event = events[index]
  document.addEventListener(event, ev => {
    console.log(event, ev.target, ev.detail ? ev.detail : undefined)
  })
}
