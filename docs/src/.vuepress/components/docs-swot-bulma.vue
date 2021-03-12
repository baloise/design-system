<template>
  <table class="docs-swot-table">
    <tr>
      <th></th>
      <th class="green">
        <strong>Helpful</strong><br />
        <small>to achieving the objective</small>
      </th>
      <th class="red">
        <strong>Harmful</strong><br />
        <small>to achieving the objective</small>
      </th>
    </tr>
    <tr>
      <th class="yellow rotate">
        <div>
          <strong>Internal origin</strong><br />
          <small>(product/company attributes)</small>
        </div>
      </th>
      <td>
        <strong>Strengths</strong>
        <ul>
          <li>Easy to learn</li>
          <li>CSS only</li>
          <li>Responsive</li>
          <li>Well documented</li>
          <li>Modular</li>
          <li>Customizable</li>
        </ul>
      </td>
      <td>
        <strong>Weakness</strong>
        <ul>
          <li>Depending on the release cycle of Bulma</li>
        </ul>
      </td>
    </tr>
    <tr>
      <th class="blue rotate">
        <div>
          <strong>External origin</strong><br />
          <small>(environment/market attributes)</small>
        </div>
      </th>
      <td>
        <strong>Opportunity</strong>
        <ul>
          <li>Framework agnostic</li>
          <li>Open-Source positioning</li>
          <li>Get new components</li>
        </ul>
      </td>
      <td>
        <strong>Threat</strong>
        <ul>
          <li>Library could get deprecated</li>
        </ul>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'docs-swot-bulma',
}
</script>
