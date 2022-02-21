export const marvelHeros = `
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
  </bal-select-option>`

export const typeahead = `
<bal-select typeahead placeholder="Try finding your hero" no-data-label="No option available">
${marvelHeros}
</bal-select>`

export const multiSelect = `
<bal-select multiple placeholder="Try finding your hero">
${marvelHeros}
</bal-select>`
