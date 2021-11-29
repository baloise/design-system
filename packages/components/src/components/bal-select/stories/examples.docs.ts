export const marvelHeros = `
  <bal-select-option value="BlackWidow" label="Black Widow">
    <b style="display: block">Black Widow</b>
    <span>S.H.I.E.L.D.</span>
  </bal-select-option>
  <bal-select-option value="BlackPanter" label="Black Panter">
    <b style="display: block">Black Panter</b>
    <span>Wakanda</span>
  </bal-select-option>
  <bal-select-option value="IronMan" label="Iron Man">
    <b style="display: block">Iron Man</b>
    <span>Malibu</span>
  </bal-select-option>
  <bal-select-option value="SpiderMan" label="Spider Man">
    <b style="display: block">Spider Man</b>
    <span>Queens</span>
  </bal-select-option>
  <bal-select-option value="CaptainAmerica" label="Captain America">
    <b style="display: block">Captain America</b>
    <span>Broklyn</span>
  </bal-select-option>
  <bal-select-option value="Thor" label="Thor God of Thunder">
    <b style="display: block">Thor God of Thunder</b>
    <span>Asgard</span>
  </bal-select-option>`

export const typeahead = `
<bal-select typeahead expanded placeholder="Try finding your hero" no-data-label="No option available">
${marvelHeros}
</bal-select>`

export const multiSelect = `
<bal-select multiple expanded placeholder="Try finding your hero">
${marvelHeros}
</bal-select>`
