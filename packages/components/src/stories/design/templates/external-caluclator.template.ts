export const ExternalCaluclatorTemplate = `
<bal-app class="has-background">
  <header class="has-background-white">
    <bal-navbar no-burger>
      <bal-navbar-brand>
        <bal-icon name="logo" inverted size="large"></bal-icon>
        <bal-text style="margin-left: 15px"><strong>Calculator</strong></bal-text>
      </bal-navbar-brand>
    </bal-navbar>
  </header>
  <main>
    <div class="container is-compact py-6">
      <bal-tabs interface="o-steps">
        <bal-tab-item value="step-a" label="Person" :active="true">
          <bal-card spacing="medium" class="mt-6">
            <bal-card-title>Person</bal-card-title>
            <bal-card-subtitle>Some Description</bal-card-subtitle>

            <bal-card-content>
              <form class="columns is-multiline mt-0">
                <bal-field class="column is-full py-0" expanded>
                  <bal-field-control>
                    <bal-radio-group>
                      <bal-radio name="gender" value="male">Male</bal-radio>
                      <bal-radio name="gender" value="female">Female</bal-radio>
                    </bal-radio-group>
                  </bal-field-control>
                </bal-field>
                <bal-field class="column is-half py-0" expanded required>
                  <bal-field-label required>Firstname</bal-field-label>
                  <bal-field-control>
                    <bal-input name="firstname" placeholder="Enter your firstname" required></bal-input>
                  </bal-field-control>
                </bal-field>
                <bal-field class="column is-half py-0" expanded required>
                  <bal-field-label required>Lastname</bal-field-label>
                  <bal-field-control>
                    <bal-input name="lastname" placeholder="Enter your lastname" required></bal-input>
                  </bal-field-control>
                </bal-field>
              </form>
            </bal-card-content>
          </bal-card>
          <div class="bal-buttons is-center mt-5">
            <bal-button>Go to value</bal-button>
          </div>
        </bal-tab-item>
        <bal-tab-item value="step-b" label="Value">
          <bal-card spacing="medium" class="mt-5">
            <bal-card-title>Value</bal-card-title>
            <bal-card-subtitle>Some Description</bal-card-subtitle>

            <bal-card-content>
              <form class="columns is-multiline mt-0">
                <bal-field class="column is-half py-0" expanded required>
                  <bal-field-label required>Value</bal-field-label>
                  <bal-field-control>
                    <bal-input
                      name="value"
                      number-input
                      :decimal="2"
                      suffix="CHF"
                      placeholder="Enter your Value"
                      required
                    ></bal-input>
                  </bal-field-control>
                </bal-field>
              </form>
            </bal-card-content>
          </bal-card>
          <div class="bal-buttons is-center mt-5">
            <bal-button class="is-full">Go to summary</bal-button>
            <div class="break"></div>
            <bal-button class="is-full" color="link">Back to person</bal-button>
          </div>
        </bal-tab-item>
        <bal-tab-item value="step-c" label="Summary">
          <bal-card class="mt-5">
            <bal-card-heading>Insured person</bal-card-heading>
            <bal-card-title>Firstname Lastname</bal-card-title>
            <bal-card-subtitle>Birthdate: 21.07.2019</bal-card-subtitle>

            <bal-card-content>
              <bal-data horizontal>
                <bal-data-item>
                  <bal-data-label>Label</bal-data-label>
                  <bal-data-value>Value</bal-data-value>
                </bal-data-item>
                <bal-data-item>
                  <bal-data-label>Label</bal-data-label>
                  <bal-data-value>Value</bal-data-value>
                </bal-data-item>
                <bal-data-item>
                  <bal-data-label>Label</bal-data-label>
                  <bal-data-value>Value</bal-data-value>
                </bal-data-item>
              </bal-data>
            </bal-card-content>

            <bal-card-button icon="edit">Edit</bal-card-button>
          </bal-card>

          <bal-card color="primary" class="mt-5">
            <bal-card-content>
              <bal-checkbox>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                <a class="is-link" target="_blank" href="http://baloise.ch">Link</a>. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> including
                versions of Lorem Ipsum.
              </bal-checkbox>
              <div class="bal-buttons is-center mt-5">
                <bal-button class="is-full">Submit</bal-button>
                <div class="break"></div>
                <bal-button class="is-full" color="link">Back to value</bal-button>
              </div>
            </bal-card-content>
          </bal-card>
          <div class="bal-buttons is-center mt-5">
            <bal-button color="info" outlined class="is-full">Print</bal-button>
          </div>
        </bal-tab-item>
      </bal-tabs>
    </div>
  </main>
  </bal-app>`

// <bal-footer has-track-line></bal-footer>
