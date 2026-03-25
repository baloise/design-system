import { test } from '@baloise/ds-playwright'

test('basic', async ({ page, a11y }) => {
  await page.mount(`
    <bal-card>
      <bal-card-header>
        <bal-card-title>Heading</bal-card-title>
        <bal-close></bal-close>
      </bal-card-header>
      <bal-card-content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vero architecto rerum sed non eum qui
        odio sint! Sunt ad numquam ducimus aut minus nihil, officiis quidem eum inventore eos?
      </bal-card-content>
      <bal-card-actions>
        <bal-button color="secondary">Button</bal-button>
        <bal-button>Button</bal-button>
      </bal-card-actions>
    </bal-card>`)
  await a11y('bal-card')
})

test('css-basic', async ({ page, a11y }) => {
  await page.mount(`
    <article class="card">
      <header class="card-header">
        <h3 class="title">Header</h3>
        <bal-close></bal-close>
      </header>
      <div class="card-content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae vero architecto rerum sed non eum qui
        odio sint! Sunt ad numquam ducimus aut minus nihil, officiis quidem eum inventore eos?
      </div>
      <footer class="card-actions">
        <button class="button is-secondary">Button</button>
        <button class="button">Button</button>
      </footer>
    </article>`)
  await a11y('article')
})

test.describe('colors', () => {
  const COLORS = [
    'white',
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    '',
    'grey',
    'blue',
    'red',
    'yellow',
    'purple',
    'green',
    'red-light',
    'yellow-light',
    'purple-light',
    'green-light',
    'grey-light',
    'purple-1',
    'purple-2',
    'purple-3',
    'green-1',
    'green-2',
    'green-3',
    'red-1',
    'red-2',
    'red-3',
    'yellow-1',
    'yellow-2',
    'yellow-3',
  ] as const
  COLORS.forEach(color => {
    test(color, async ({ page, a11y }) => {
      await page.mount(`<bal-card color="${color}">
        <bal-card-header>
          <bal-card-title>${color}</bal-card-title>
        </bal-card-header>
      </bal-card>`)
      await a11y(`bal-card`)
    })
  })
})
