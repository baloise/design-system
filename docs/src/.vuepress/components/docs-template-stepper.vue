<template>
  <div class="demo-box">
    <div class="demo">
      <bal-app style="background: white;">
        <header class="has-background-white">
          <bal-navbar no-burger>
            <bal-navbar-brand>
              <bal-icon name="logo" inverted size="large"></bal-icon>
              <span class="ml-2"><strong>Stepper</strong></span>
            </bal-navbar-brand>
          </bal-navbar>
        </header>
        <main>
          <div class="container">
            <bal-tabs interface="steps" class="pt-5" :value="activeStep">
              <bal-tab-item
                value="step-a"
                label="Person"
                @balNavigate="goToPerson()"
                :done="activeStep !== 'step-a'"
                :active="activeStep === 'step-a'"
              >
                <bal-card spacing="medium" class="mt-5">
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
                  <bal-button @click="goToValue()">Go to value</bal-button>
                </div>
              </bal-tab-item>
              <bal-tab-item
                value="step-b"
                label="Value"
                @balNavigate="goToValue()"
                :done="activeStep === 'step-c'"
                :active="activeStep === 'step-b'"
              >
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
                            decimal="2"
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
                  <bal-button class="is-full" @click="goToSummary()">Go to summary</bal-button>
                  <div class="break"></div>
                  <bal-button class="is-full" color="link" @click="goToPerson()">Back to person</bal-button>
                </div>
              </bal-tab-item>
              <bal-tab-item
                value="step-c"
                label="Summary"
                @balNavigate="goToSummary()"
                :active="activeStep === 'step-c'"
              >
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
                      industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                      and scrambled it to make a type specimen book. It has survived not only five centuries, but also
                      the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
                      desktop publishing software like Aldus
                      <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> including versions of Lorem
                      Ipsum.
                    </bal-checkbox>
                    <div class="bal-buttons is-center mt-5">
                      <bal-button class="is-full">Submit</bal-button>
                      <div class="break"></div>
                      <bal-button class="is-full" color="link" @click="goToValue()">Back to value</bal-button>
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
        <bal-footer has-track-line>
          <div class="container">
            <span style="margin-right: 16px">Baloise Group</span>
            <span style="margin-right: 16px">Legal notice</span>
            <span style="margin-right: 16px">Cookie policy</span>
            <span>Data protection</span>
          </div>
        </bal-footer>
      </bal-app>
    </div>
  </div>
</template>
<script>
export default {
  name: 'docs-template-stepper',
  data() {
    return {
      activeStep: 'step-a',
    }
  },
  methods: {
    goToPerson() {
      this.activeStep = 'step-a'
    },
    goToValue() {
      this.activeStep = 'step-b'
    },
    goToSummary() {
      this.activeStep = 'step-c'
    },
  },
}
</script>
