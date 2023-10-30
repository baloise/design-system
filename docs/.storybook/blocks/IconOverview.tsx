import React, { useState, useEffect } from 'react'
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
  const [filteredIcons, setFilteredIcons] = useState(icons)

  const handleInputChange = e => {
    const searchTerm = e.target.value
    setSearchItem(searchTerm)
    filterItems()
  }

  const handleCollectionClick = (selectedCollection, selectedColor) => {
    setCollection(selectedCollection)
    setColor(selectedColor)
    filterItems()
  }

  function filterItems() {
    setFilteredIcons(
      icons
        .filter(icon => icon.collection === collection)
        .filter(icon => icon.color === color)
        .filter(icon => icon.name.toLowerCase().includes(searchItem.toLowerCase())),
    )
  }

  useEffect(() => filterItems())

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
      <div className="is-flex fg-normal my-normal">
        <button
          onClick={_ => handleCollectionClick('ui-icons', 'primary')}
          className={`${
            color === 'primary' ? 'has-background-primary has-text-white' : 'has-background-primary-1'
          } is-flex-1 has-border-none has-radius-normal has-text-weight-bold py-small px-normal is-clickable doc-shadow-hover`}
        >
          UI Icons
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'purple')}
          className={`${
            color === 'purple' ? 'has-background-purple-5 has-text-white' : 'has-background-purple-1'
          } is-flex-1 has-border-none has-radius-normal has-text-weight-bold py-small px-normal is-clickable doc-shadow-hover`}
        >
          <small className='has-size-x-small is-block mb-x-small has-text-weight-regular'>Brand Icons</small>Purple
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'green')}
          className={`${
            color === 'green' ? 'has-background-green-5 has-text-white' : 'has-background-green-1'
          } is-flex-1 has-border-none has-radius-normal has-text-weight-bold py-small px-normal is-clickable doc-shadow-hover`}
        >
          <small className='has-size-x-small is-block mb-x-small has-text-weight-regular'>Brand Icons</small>Green
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'red')}
          className={`${
            color === 'red' ? 'has-background-red-5 has-text-white' : 'has-background-red-1'
          } is-flex-1 has-border-none has-radius-normal has-text-weight-bold py-small px-normal is-clickable doc-shadow-hover`}
        >
          <small className='has-size-x-small is-block mb-x-small has-text-weight-regular'>Brand Icons</small>Red
        </button>
        <button
          onClick={_ => handleCollectionClick('brand-icons', 'yellow')}
          className={`${
            color === 'yellow' ? 'has-background-yellow-5 has-text-white' : 'has-background-yellow-1'
          } is-flex-1 has-border-none has-radius-normal has-text-weight-bold py-small px-normal is-clickable doc-shadow-hover`}
        >
          <small className='has-size-x-small is-block mb-x-small has-text-weight-regular'>Brand Icons</small>Yellow
        </button>
      </div>
      <div className="is-flex is-flex-wrap-wrap fg-xx-small mt-x-large">
        {filteredIcons.map(icon => (
          <div
            key={`${icon.collection}__${icon.name}`}
            className={`has-background-${icon.color}-1 has-radius-normal px-x-small pt-medium pb-normal is-flex is-justify-content-center is-align-items-center fg-small is-flex-direction-column has-text-centered`}
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
              className="is-size-x-small has-text-weight-bold is-flex is-justify-content-center is-align-items-center"
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
