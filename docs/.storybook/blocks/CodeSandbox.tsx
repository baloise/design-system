import React, { useState, useEffect } from 'react'
import { global } from '@storybook/global'
import { useOf } from '@storybook/blocks'

import { buildAngularParameters } from './utils/code-sandbox.angular'
import { buildReactParameters } from './utils/code-sandbox.react'
import { buildHtmlParameters } from './utils/code-sandbox.html'

export const CodeSandbox = ({ of }) => {
  const framework = global['__STORYBOOK_PREVIEW__'].storyStore.globals.globals.framework
  let template = ''
  let exampleFiles = {}

  if (of) {
    const resolvedOf = useOf(of || 'story', ['story', 'meta'])
    template = resolvedOf.story.originalStoryFn({ ...resolvedOf.story.initialArgs }).innerHTML
    exampleFiles = (resolvedOf.story.parameters.balCodeSandbox || {}).files
  }

  const [parameters, setParameters] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (framework === 'react') {
      buildReactParameters({ template, exampleFiles }).then(newParameters => {
        setParameters(newParameters)
        setLoading(false)
      })
    } else if (framework === 'html') {
      buildHtmlParameters({ template, exampleFiles }).then(newParameters => {
        setParameters(newParameters)
        setLoading(false)
      })
    } else {
      buildAngularParameters({ template, exampleFiles }).then(newParameters => {
        setParameters(newParameters)
        setLoading(false)
      })
    }
  })

  const label = template === '' ? 'Try Online' : `Code Sandbox`

  if (framework === 'vue' || (of && framework !== 'angular')) {
    return ''
  }

  if (loading) {
    return (
      <button className="sb-unstyled button is-info is-disabled" disabled>
        <div className="is-flex fg-xx-small">
          <svg width="24px" height="24px" viewBox="0 0 256 296" version="1.1" preserveAspectRatio="xMidYMid">
            <g>
              <path
                d="M115.497674,261.08837 L115.497674,154.478845 L23.8139535,101.729261 L23.8139535,162.501763 L65.8104558,186.8486 L65.8104558,232.549219 L115.497674,261.08837 Z M139.311628,261.714907 L189.916577,232.563707 L189.916577,185.779949 L232.186047,161.285235 L232.186047,101.27387 L139.311628,154.895035 L139.311628,261.714907 Z M219.971965,80.8276886 L171.155386,52.5391067 L128.292316,77.4106841 L85.1040206,52.5141067 L35.8521355,81.1812296 L127.765737,134.063073 L219.971965,80.8276886 Z M0,222.211907 L0,74.4948807 L127.986799,0 L256,74.1820085 L256,221.978632 L127.983954,295.72283 L0,222.211907 Z"
                fill="#000000"
              ></path>
            </g>
          </svg>
          <span>{label}</span>
        </div>
      </button>
    )
  }

  return (
    <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank" className="sb-unstyled">
      <input type="hidden" name="parameters" value={parameters} />
      <button className="button is-info">
        <div className="is-flex fg-xx-small">
          <svg width="24px" height="24px" viewBox="0 0 256 296" version="1.1" preserveAspectRatio="xMidYMid">
            <g>
              <path
                d="M115.497674,261.08837 L115.497674,154.478845 L23.8139535,101.729261 L23.8139535,162.501763 L65.8104558,186.8486 L65.8104558,232.549219 L115.497674,261.08837 Z M139.311628,261.714907 L189.916577,232.563707 L189.916577,185.779949 L232.186047,161.285235 L232.186047,101.27387 L139.311628,154.895035 L139.311628,261.714907 Z M219.971965,80.8276886 L171.155386,52.5391067 L128.292316,77.4106841 L85.1040206,52.5141067 L35.8521355,81.1812296 L127.765737,134.063073 L219.971965,80.8276886 Z M0,222.211907 L0,74.4948807 L127.986799,0 L256,74.1820085 L256,221.978632 L127.983954,295.72283 L0,222.211907 Z"
                fill="#000000"
              ></path>
            </g>
          </svg>
          <span>{label}</span>
        </div>
      </button>
    </form>
  )
}
