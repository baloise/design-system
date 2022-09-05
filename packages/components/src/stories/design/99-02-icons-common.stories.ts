import { sourceCode } from '../../stories/utils'

export default {
  title: 'Design/Common Templates',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
}

export const Icons = args => ({
  components: {},
  setup: () => ({ args }),
  template: ` 
  <div class="container is-wide mt-6">
    <bal-image-slider v-bind="args">
      <bal-image-slider-item src="https://i.picsum.photos/id/703/1280/720.jpg?hmac=sICuW9WVQ1Ul6j4mTHDPbj43bHqe062gU35Blq2V-MI"></bal-image-slider-item>
      <bal-image-slider-item src="https://i.picsum.photos/id/295/1280/720.jpg?hmac=qld217fiBmNfVt-eV0ffFBz9FRbZlVicvA7wqjNwx2I"></bal-image-slider-item>
      <bal-image-slider-item src="https://i.picsum.photos/id/480/1280/720.jpg?hmac=AaBd7JFxQz7hmKf-OpMx8cC1NiqPC-ZbA6Wk4GGQLzw"></bal-image-slider-item>
    </bal-image-slider>
    <br/>
    <bal-button icon="account" class="mr-2">Content</bal-button>
    <bal-button icon="account" square></bal-button>
    <br/><br/>
    <bal-button icon="account" size="small" class="mr-2">Content</bal-button>
    <bal-button icon="account" size="small" square></bal-button>
    <br/><br/>
    <bal-badge color="success" icon="check"></bal-badge>
    <br/>
    <bal-badge color="success" icon="check" size="small"></bal-badge>
    <br/>
    <bal-close></bal-close>
    <br/>
    <bal-close size="small"></bal-close>
    <br/>
    <bal-field expanded class="mt-7">
    <bal-field-label>Firstname</bal-field-label>
    <bal-field-hint v-bind="args" subject="Spider-Man"> Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. </bal-field-hint>
    <bal-field-control>
      <bal-datepicker></bal-datepicker>
    </bal-field-control>
    <bal-field-message color="danger">Required Field</bal-field-message>
    </bal-field>
    <br/>
    <bal-select multiple placeholder="Try finding your hero" value="SpiderMan,IronMan">
      <bal-select-option value="BlackWidow" label="Black Widow">
          <b style="display: block">Black Widow</b>
          <span class="is-small">S.H.I.E.L.D.</span>
      </bal-select-option>
      <bal-select-option value="BlackPanter" label="Black Panter">
          <b style="display: block">Black Panter</b>
          <span class="is-small">Wakanda</span>
      </bal-select-option>
      <bal-select-option value="IronMan" label="Iron Man">
          <b style="display: block">Iron Man</b>
          <span class="is-small">Malibu</span>
      </bal-select-option>
      <bal-select-option value="SpiderMan" label="Spider Man">
          <b style="display: block">Spider Man</b>
          <span class="is-small">Queens</span>
      </bal-select-option>
      <bal-select-option value="CaptainAmerica" label="Captain America">
          <b style="display: block">Captain America</b>
          <span class="is-small">Broklyn</span>
      </bal-select-option>
      <bal-select-option value="Thor" label="Thor God of Thunder">
          <b style="display: block">Thor God of Thunder</b>
          <span class="is-small">Asgard</span>
      </bal-select-option>
  </bal-select>
  <br/>
  <bal-snackbar subject="Default" icon="info-circle" action="More">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </bal-snackbar>
  <br/>
  <bal-list border>
    <bal-list-item clickable>
      <bal-list-item-icon>
        <bal-icon name="file"></bal-icon>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Document</bal-list-item-title>
        <bal-list-item-subtitle>PDF - 98KB</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="download"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>

    <bal-list-item clickable>
      <bal-list-item-icon>
        <bal-icon name="picture"></bal-icon>
      </bal-list-item-icon>
      <bal-list-item-content>
        <bal-list-item-title>Picture</bal-list-item-title>
        <bal-list-item-subtitle>PNG - 140KB</bal-list-item-subtitle>
      </bal-list-item-content>
      <bal-list-item-icon right>
        <bal-icon name="download"></bal-icon>
      </bal-list-item-icon>
    </bal-list-item>
  </bal-list>
  <br/>
  <bal-data v-bind="args">
  <bal-data-item>
  <bal-data-label>Editable Multiline</bal-data-label>
  <bal-data-value multiline editable>A very long value, that should go break to the next line. I really hope that this works :-)</bal-data-value>
  </bal-data-item>
  <bal-data-item>
    <bal-data-label>
      With a hint
      <bal-hint>
        <bal-hint-title>Spider-Man</bal-hint-title>
        <bal-hint-text>
          Spider-Man is a fictional superhero created by writer-editor Stan Lee and writer-artist Steve Ditko. He first appeared in the anthology comic book Amazing
          Fantasy #15 (August 1962) in the Silver Age of Comic Books. He appears in American comic books published by Marvel Comics, as well as in a number of movies,
          television shows, and video game adaptations set in the Marvel Universe.
        </bal-hint-text>
      </bal-hint>
    </bal-data-label>
    <bal-data-value>Value</bal-data-value>
  </bal-data-item>
  </bal-data>
  <br/>
  <bal-tabs clickable interface="o-steps" value="tab-c">
      <bal-tab-item done value="tab-a" label="Finished Step">
          <p class="my-5">Content of Tab A</p>
      </bal-tab-item>
      <bal-tab-item failed value="tab-b" label="Failed Step">
          <p class="my-5">Content of Tab B</p>
      </bal-tab-item>
      <bal-tab-item value="tab-c" label="Active Step">
          <p class="my-5">Content of Tab C</p>
      </bal-tab-item>
      <bal-tab-item value="tab-d" label="Tab D">
          <p class="my-5">Content of Tab D</p>
      </bal-tab-item>
      <bal-tab-item disabled value="tab-e" label="Disabled Step">
          <p class="my-5">Content of Tab E</p>
      </bal-tab-item>
  </bal-tabs>
</div>
  `,
})
Icons.args = {}
Icons.parameters = {
  ...sourceCode(Icons, Icons.args, {}),
  controls: { exclude: [] },
}
