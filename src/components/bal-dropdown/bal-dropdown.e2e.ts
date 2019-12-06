import { newE2EPage } from '@stencil/core/testing';

describe('bal-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<bal-dropdown></bal-dropdown>');

    const element = await page.find('bal-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
