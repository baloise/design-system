import React, { useState } from 'react'
import { useGlobals } from '@storybook/api'
import { addons, types } from '@storybook/addons'
import { FORCE_RE_RENDER } from '@storybook/core-events'
import { WithTooltip, TooltipLinkList } from '@storybook/components'

const AngularSVG = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 250 250" style="enable-background:new 0 0 250 250;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#DD0031;}
	.st1{fill:#C3002F;}
	.st2{fill:#FFFFFF;}
</style>
<g>
	<polygon class="st0" points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2 	"/>
	<polygon class="st1" points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 125,230 203.9,186.3 218.1,63.2 125,30 	"/>
	<path class="st2" d="M125,52.1L66.8,182.6h0h21.7h0l11.7-29.2h49.4l11.7,29.2h0h21.7h0L125,52.1L125,52.1L125,52.1L125,52.1
		L125,52.1z M142,135.4H108l17-40.9L142,135.4z"/>
</g>
</svg>
`

const VueSVG = `<svg version="1.1" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.3333 0 0 -1.3333 -76.311 313.34)"><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-75.491l98.16-170.02 98.16 170.02z" fill="#41b883"/></g><g transform="translate(178.06 235.01)"><path d="m0 0-22.669-39.264-22.669 39.264h-36.227l58.896-102.01 58.896 102.01z" fill="#34495e"/></g></g></svg>
`

const ReactSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
  <title>React Logo</title>
  <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
  <g stroke="#61dafb" stroke-width="1" fill="none">
    <ellipse rx="11" ry="4.2"/>
    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
  </g>
</svg>`

const JavaScriptSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630">
<rect width="630" height="630" fill="#f7df1e"/>
<path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
</svg>`

const SvgIcons = {
  angular: AngularSVG,
  react: ReactSVG,
  vue: VueSVG,
  html: JavaScriptSVG,
}

addons.register('my/framework', () => {
  addons.add('my-framework-addon/toolbar', {
    title: 'Framework',
    type: types.TOOLEXTRA,
    render: ({ active }) => {
      const [globals, updateGlobals] = useGlobals()

      const iframe = document.getElementById('storybook-preview-iframe')
      if (iframe && globals.framework) {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document
        if (iframeDocument) {
          const body = iframeDocument.querySelector('body')
          if (body) {
            body.classList.add(`my-framework-${globals.framework}`)
          }
        }
      }

      console.log('--> globals.framework', globals.framework)

      const labels = {
        angular: 'Angular',
        html: 'HTML & JS',
        react: 'React',
        vue: 'Vue.js',
      }

      const capitalize = str => {
        if (!str) {
          return ''
        }
        return str.charAt(0).toUpperCase() + str.slice(1)
      }

      return (
        <div className="my-framework">
          <WithTooltip
            placement="top"
            trigger="click"
            closeOnClick
            tooltip={({ onHide }) => {
              const handleItemClick = value => {
                updateGlobals({ ...globals, framework: value })
                addons.getChannel().emit(FORCE_RE_RENDER)
                setTimeout(() => location.reload(), 100)
                onHide()
              }

              // TODO: my-framework__tooltip__item--active
              const isActive = f => (f === globals.framework ? ` my-framework__tooltip__item--active` : '')

              return (
                <div className="my-framework__tooltip">
                  <a
                    id="angular"
                    className={`my-framework__tooltip__item${isActive('angular')}`}
                    onClick={() => handleItemClick('angular')}
                  >
                    <div className="my-framework__button__icon" dangerouslySetInnerHTML={{ __html: AngularSVG }}></div>
                    Angular
                  </a>
                  <a
                    id="html"
                    className={`my-framework__tooltip__item${isActive('html')}`}
                    onClick={() => handleItemClick('html')}
                  >
                    <div
                      className="my-framework__button__icon"
                      dangerouslySetInnerHTML={{ __html: JavaScriptSVG }}
                    ></div>
                    HTML &amp; JS
                  </a>
                  <a
                    id="react"
                    className={`my-framework__tooltip__item${isActive('react')}`}
                    onClick={() => handleItemClick('react')}
                  >
                    <div className="my-framework__button__icon" dangerouslySetInnerHTML={{ __html: ReactSVG }}></div>
                    React
                  </a>
                  <a
                    id="vue"
                    className={`my-framework__tooltip__item${isActive('vue')}`}
                    onClick={() => handleItemClick('vue')}
                  >
                    <div className="my-framework__button__icon" dangerouslySetInnerHTML={{ __html: VueSVG }}></div>
                    Vue
                  </a>
                </div>
              )
            }}
          >
            <button className="my-framework__button" title="Integration technology">
              <span className="my-framework__button__label">Framework:</span>
              <div
                className="my-framework__button__icon"
                dangerouslySetInnerHTML={{ __html: SvgIcons[globals.framework] }}
              ></div>
              {labels[globals.framework]}
            </button>
          </WithTooltip>
        </div>
      )
    },
  })
})
