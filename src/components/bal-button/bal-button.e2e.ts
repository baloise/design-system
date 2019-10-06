import { newE2EPage } from "@stencil/core/testing";

describe("bal-button", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(
      '<bal-button type="is-primary">Press me</bal-button>',
    );

    const buttonElement = await page.find("bal-button >>> button");
    expect(buttonElement).toHaveClass("button");
    expect(buttonElement).toHaveClass("is-primary");
  });
});
