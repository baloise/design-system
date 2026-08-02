import type { Meta } from '@storybook/html-vite'
import { StoryFactory, withRender } from '../../utils'

const meta: Meta = {
  title: 'CSS Utilities/Layout/Position',
  tags: ['!dev'],
}

export default meta

const Story = StoryFactory(meta)

export const Static = Story({
  ...withRender(
    () => `<div class="relative">
  <div class="static bg-green-2 p-normal radius" style="min-width: 300px; min-height: 120px;">
    <p>Static</p>
    <div class="absolute bottom-none left-0 bg-green radius p-normal" style="min-width: 100px; min-height: 56px">
      Absolute
    </div>
  </div>
</div>`,
  ),
})
export const Fixed = Story({
  ...withRender(
    () => `<div class="overflow-hidden" style="height: 250px">
  <div class="relative radius border-primary" style="height: 200px">
    <div class="absolute top-0 left-0 px-normal py-small w-full bg-primary">
      Fixed
    </div>
    <div class="absolute overflow-auto mt-x-large p-normal" style="height: 150px">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
      Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
      Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
      Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
      Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
      Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
      Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
      Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
      Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
    </div>
  </div>
</div>`,
  ),
})
export const Relative = Story({
  ...withRender(
    () => `<div class="relative">
  <div class="relative bg-green-2 p-normal radius" style="min-width: 300px; min-height: 140px;">Relative
    <div class="absolute bottom-none left-0 bg-green p-normal radius" style="min-width: 100px; min-height: 56px">
      Absolute
    </div>
  </div>
</div>
`,
  ),
})
export const Absolute = Story({
  ...withRender(
    () => `<div class="mb-normal">
  <div class="relative bg-green-2 radius p-normal">
    <p class="mt-none">Relative</p>
    <div class="static bg-green-3 radius p-normal" style="min-width: 300px; min-height: 150px;">
      <p class="mt-none">Static</p>
      <div class="static bottom-none left-0 bg-green-4 radius p-normal" style="min-width: 120px; min-height: 56px">
        Static
      </div>
    </div>
  </div>
</div>

<div class="relative bg-green-2 radius p-normal">
  <p class="mt-0">Relative</p>
  <div class="static bg-green-3 radius p-normal" style="min-width: 300px; min-height: 150px;">
    <p class="mt-0">Static</p>
    <div
      class="absolute bottom-none left-0 bg-green-4 radius p-normal"
      style="min-width: 120px; min-height: 56px"
    >
      Dynamic
    </div>
  </div>
</div>`,
  ),
})
export const Sticky = Story({
  ...withRender(
    () => `<div class="overflow-hidden">
  <div class="overflow-auto radius border-primary" style="height: 280px">
    <div>
      <div class="sticky top-0 bg-green p-normal">
        Sticky Title 1
      </div>
      <p class="p-normal m-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      </p>
    </div>
    <div>
      <div class="sticky top-0 bg-green p-normal">
        Sticky Title 2
      </div>
      <p class="p-normal m-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      </p>
    </div>
    <div>
      <div class="sticky top-0 bg-green p-normal">
        Sticky Title 3
      </div>
      <p class="p-normal m-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      </p>
    </div>
    <div>
      <div class="sticky top-0 bg-green p-normal">
        Sticky Title 4
      </div>
      <p class="p-normal m-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      </p>
    </div>
    <div>
      <div class="sticky top-0 bg-green p-normal">
        Sticky Title 5
      </div>
      <p class="p-normal m-none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Vitae sapien pellentesque habitant morbi tristique senectus et netus. Vitae proin sagittis nisl rhoncus mattis.
        Maecenas pharetra convallis posuere morbi leo urna molestie. At in tellus integer feugiat scelerisque.
        Adipiscing elit duis tristique sollicitudin nibh sit amet commodo. Luctus accumsan tortor posuere ac ut.
      </p>
    </div>
  </div>
</div>`,
  ),
})
