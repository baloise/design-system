
import React from 'react';

export const WelcomeNews = ({children}) => {
  return <div className='my-welcome-content mt-xx-large mb-large sb-unstyled'>
    <h2 className='title'>Latest News</h2>
    <div className="columns is-multiline">
      <div className="column">
        <bal-card fullheight flat class="p-none" color="purple-2">
          <bal-card-content>
            <bal-text size="small" space="none">
              23.03.2023
            </bal-text>
            <bal-heading space="bottom" level="h3">
              Upgrade to v13
            </bal-heading>
            <bal-text space="top">
              Due to Angular performance optimizations we need to change the module architecture. Moreover,
              steps & tabs component are divided to be more maintainable. Types of properties and events have
              been improved from the ground.
            </bal-text>
            <a
              className="button is-primary mt-normal"
              style={{ width: 'auto' }}
              href="?path=/docs/development-upgrade-guides-updating-to-v13--page"
            >
              Upgrade Guide
            </a>
          </bal-card-content>
        </bal-card>
      </div>
    </div>
  </div>
};

