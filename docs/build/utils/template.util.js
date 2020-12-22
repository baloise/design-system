const buildMethodTemplate = (name, description, signature) => `
<table style="width:100%; display: inline-table;">
<tbody>
    <tr style="background: #f8f8f8">
        <th colspan="2" style="text-align: left" style="width:100%">
            <h3 id="${name}">
                <a href="#/testing/accessors?id=${name}" data-id="${name}" class="anchor">
                    <span>${name}</span>
                </a>
            </h3>
        </th>
    </tr>
    <tr style="background: #fff">
        <td width="120px"><b>Description</b></td>
        <td>${description}</td>
    </tr>
    <tr style="background: #fff">
        <td width="120px"><b>Signature</b></td>
        <td><code>${signature}</code></td>
    </tr>
  </tbody>
</table>`

module.exports = {
    buildMethodTemplate,
}
