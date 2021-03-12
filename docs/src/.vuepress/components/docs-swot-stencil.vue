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
          <li>Future Friendly</li>
          <li>TypeScript Support</li>
          <li>Browser Support</li>
          <li>Easy to learn</li>
          <li>Needs no dependencies at runtime</li>
          <li>Web Standards</li>
          <li>Automatic Optimizations</li>
          <li>Run-time Performance</li>
          <li>Framework Features During Development</li>
        </ul>
      </td>
      <td>
        <strong>Weakness</strong>
        <ul>
          <li>Depending on the release cycle of Stencil</li>
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
          <li>Get new features</li>
          <li>Web Standards</li>
          <li>Only ships Web Components</li>
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
  name: 'docs-swot-stencil',
}
</script>
