import React, { useState } from 'react'
import uiIcons from '../../stories/assets/data/icons.json'
import brandIcons from '../../stories/assets/data/brand-icons.json'

const icons = [
  ...uiIcons.sort().map(name => ({ name, collection: 'ui-icons', color: 'primary' })),
  ...brandIcons.sort().map(name => ({
    name,
    collection: 'brand-icons',
    color: name.endsWith('purple')
      ? 'purple'
      : name.endsWith('red')
        ? 'red'
        : name.endsWith('green')
          ? 'green'
          : name.endsWith('tangerine')
            ? 'yellow'
            : 'primary',
  })),
].sort((a, b) => a.name.localeCompare(b.name))

export const IconOverview = ({ children }) => {
  const [collection, setCollection] = useState('ui-icons')
  const [color, setColor] = useState('primary')
  const [searchItem, setSearchItem] = useState('')

  const handleInputChange = e => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)
  }

  const handleCollectionClick = (selectedCollection, selectedColor) => {
    setCollection(selectedCollection)
    setColor(selectedColor)
  }

  return (
    <div className="sb-unstyled">
      <div>
        <input
          className="input"
          type="text"
          placeholder="Search icons"
          value={searchItem}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex gap-normal my-normal">
        <button
          onClick={_ => handleCollectionClick('ui-icons', 'primary')}
          className={`${
            color === 'primary' ? 'bg-primary text-white' : 'bg-primary-1'
          } flex-1 border-none radius-normal font-weight-bold py-small px-normal cursor-pointer doc-shadow-hover`}
        >
          UI Icons
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'purple')}
          className={`${
            color === 'purple' ? 'bg-purple-5 text-white' : 'bg-purple-1'
          } flex-1 border-none radius-normal font-weight-bold py-small px-normal cursor-pointer doc-shadow-hover`}
        >
          <small className="text-x-small block mb-x-small font-weight-regular">Brand Icons</small>Purple
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'green')}
          className={`${
            color === 'green' ? 'bg-green-5 text-white' : 'bg-green-1'
          } flex-1 border-none radius-normal font-weight-bold py-small px-normal cursor-pointer doc-shadow-hover`}
        >
          <small className="text-x-small block mb-x-small font-weight-regular">Brand Icons</small>Green
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'red')}
          className={`${
            color === 'red' ? 'bg-red-5 text-white' : 'bg-red-1'
          } flex-1 border-none radius-normal font-weight-bold py-small px-normal cursor-pointer doc-shadow-hover`}
        >
          <small className="text-x-small block mb-x-small font-weight-regular">Brand Icons</small>Red
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'yellow')}
          className={`${
            color === 'yellow' ? 'bg-yellow-5 text-white' : 'bg-yellow-1'
          } flex-1 border-none radius-normal font-weight-bold py-small px-normal cursor-pointer doc-shadow-hover`}
        >
          <small className="text-x-small block mb-x-small font-weight-regular">Brand Icons</small>Yellow
        </button>
      </div>
      <div className="flex flex-wrap gap-xx-small mt-x-large">
        {icons
          .filter(
            icon =>
              icon.collection === collection &&
              icon.color === color &&
              icon.name.toLowerCase().includes(searchItem.toLowerCase()),
          )
          .map(icon => (
            <div
              key={`${icon.collection}__${icon.name}`}
              className={`bg-${icon.color}-1 radius-normal px-x-small pt-medium pb-normal flex justify-content-center align-items-center gap-small flex-direction-column text-align-center`}
              style={{ width: '138px' }}
            >
              {icon.collection === 'ui-icons' ? (
                <div
                  style={{
                    maskImage: `url(/assets/images/icons/${icon.name}.svg)`,
                    WebkitMaskImage: `url(/assets/images/icons/${icon.name}.svg)`,
                    backgroundColor: 'var(--bal-color-primary)',
                    height: '32px',
                    width: '32px',
                  }}
                ></div>
              ) : (
                <img src={`/assets/images/brand-icons/${icon.name}.svg`} alt={icon.name} width={'64px'} />
              )}
              <span
                className="text-x-small font-weight-bold flex justify-content-center align-items-center"
                style={{ minHeight: '40px' }}
              >
                {icon.name}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
