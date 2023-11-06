import type { JSX } from '@baloise/design-system-components'
import type { Meta } from '@storybook/html'
import {
  withRender,
  withContent,
  withDefaultContent,
  withComponentControls,
  StoryFactory,
  ListenerFactory,
} from '../../utils'

type Args = JSX.BalForm & { content: string }

const listener = ListenerFactory()

const meta: Meta<Args> = {
  title: 'Components/Form/Form',
  args: {
    ...withDefaultContent(),
  },
  argTypes: {
    ...withContent(),
    ...withComponentControls({ tag: 'bal-form' }),
  },
  render: (args, context) => {
    const section: HTMLElement = document.createElement('section')

    section.innerHTML = `<bal-form id="form">
    <bal-form-grid>
        <bal-form-col>
            <bal-field invalid="true">
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field>
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field invalid="true">
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field>
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field invalid="true">
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field>
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field invalid="true">
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field>
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-field invalid="true">
                <bal-field-label>Label</bal-field-label>
                <bal-field-control>
                    <bal-input placeholder="Placeholder"></bal-input>
                </bal-field-control>
            </bal-field>
        </bal-form-col>
        <bal-form-col>
            <bal-button-group>
                <bal-button>Submit (scroll to the first invalid field)</bal-button>
            </bal-button-group>
        </bal-form-col>
    </bal-form-grid>
  </bal-form>`

    listener.addEventListener('click', context, (event: UIEvent) => {
      const button = (event.target as any).closest('bal-button')

      if (button) {
        const label = button.innerText.trim()

        const form = document.getElementById('form') as HTMLFormElement

        if (form) {
          if (label === 'Submit (scroll to the first invalid field)') {
            form.scrollToFirstInvalidField()
          }
        }
      }
    })

    return section
  },
}

export default meta

/**
 * STORIES
 * ------------------------------------------------------
 */

const Story = StoryFactory<Args>(meta)

export const Basic = Story()

export const Autocomplete = Story({
  ...withRender(
    () => `<form action="https://www.w3schools.com/action_page.php" target="_blank">
    <bal-card>
        <bal-card-content>
            <bal-form-grid>
                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label>Firstname</bal-field-label>
                        <bal-field-control>
                            <bal-input name="firstname" placeholder="Enter your firstname" value="" autocomplete="on"></bal-input>
                        </bal-field-control>
                        <bal-field-message>Field Message</bal-field-message>
                    </bal-field>
                </bal-form-col>
                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label>Lastname</bal-field-label>
                        <bal-field-control>
                            <bal-input name="lastname" placeholder="Enter your lastname" value="" autocomplete="on"></bal-input>
                        </bal-field-control>
                        <bal-field-message>Field Message</bal-field-message>
                    </bal-field>
                </bal-form-col>
  
                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label>Street</bal-field-label>
                        <bal-field-control>
                            <bal-input name="street" placeholder="Enter your street" autocomplete="on"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>
  
                <bal-form-col size="half">
                    <bal-field required="true">
                        <bal-field-label>City</bal-field-label>
                        <bal-field-control>
                            <bal-input name="city" placeholder="Basel" autocomplete="on"></bal-input>
                        </bal-field-control>
                    </bal-field>
                </bal-form-col>
  
            </bal-form-grid>
        </bal-card-content>
        <bal-card-actions position="left">
            <bal-button element-type="submit" color="primary">Submit</bal-button>
        </bal-card-actions>
    </bal-card>
  </form>`,
  ),
})
