export const withLink = `
<bal-checkbox> Random text with a <a class="is-link" target="_blank" href="http://baloise.ch">Link</a> in it. </bal-checkbox>
`

export const inABox = `
<div class="columns" style="max-width: 400px">
  <div class="column">
    <div class="is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius">
      <img src="https://www.baloise.ch/dam/jcr:5d0376a5-53ef-40b9-a1d9-c6d7d0c56bf7/Haushalt.svg" >
      <p class="has-text-blue is-bold mb-0">Title</p>
      <p class="has-text-blue mb-3">Subtitle</p>
      <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
      <bal-checkbox class="mb-3">Add</bal-checkbox>
    </div>
  </div>
  <div class="column">
    <div class="is-flex px-4 py-2 is-flex-direction-column is-justify-content-center is-align-items-center has-border-blue has-border-radius has-background-blue-light">
      <img src="https://www.baloise.ch/dam/jcr:3635255e-33e7-4adf-8b3e-99954faf6036/reiseversicherung.svg" >
      <p class="has-text-blue is-bold mb-0">Title</p>
      <p class="has-text-blue mb-3">Subtitle</p>
      <p class="has-text-blue-light-text is-size-6 mb-4">More Description</p>
      <bal-checkbox class="mb-3" checked>Add</bal-checkbox>
    </div>
  </div>
</div>`
