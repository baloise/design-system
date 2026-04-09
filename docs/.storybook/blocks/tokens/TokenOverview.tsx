import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

type TokenCategory = 'all' | 'primitive' | 'semantic' | 'component'

type FlattenedToken = {
  id: string
  category: TokenCategory
  typeLabel: string
  name: string
  cssVarName: string
  value: unknown
  path: string
  tokenType?: string
  referencePath?: string
}

const metaKeys = new Set([
  '$type',
  '$value',
  '$extensions',
  'filePath',
  'isSource',
  'original',
  'name',
  'attributes',
  'path',
  'key',
])

const mapTopKeyToCategory = (key: string): TokenCategory => {
  if (key.includes('🧱') || /primitive/i.test(key)) return 'primitive'
  if (key.includes('🏷️') || /semantic/i.test(key)) return 'semantic'
  if (key.includes('🧩') || /component/i.test(key)) return 'component'
  return 'all'
}

const flattenTokens = (source: unknown): FlattenedToken[] => {
  const result: FlattenedToken[] = []

  const walk = (node: unknown, keyPath: string[]): void => {
    if (!node || typeof node !== 'object') return

    const record = node as Record<string, unknown>

    if ('$value' in record) {
      const topKey = keyPath[0] || ''
      const rawTypeLabel = keyPath[1] || ''
      const category = mapTopKeyToCategory(topKey)

      let typeLabel = rawTypeLabel
      if (category === 'component') {
        if (!typeLabel || !typeLabel.startsWith('🧩')) {
          typeLabel = typeLabel ? `🧩 ${typeLabel}` : '🧩 Component'
        }
      }
      const name = (record.name as string) || keyPath.join('.')
      const tokenType = typeof record.$type === 'string' ? (record.$type as string) : undefined
      const original = (record.original || {}) as Record<string, unknown>
      let referencePath: string | undefined

      if (typeof original.$value === 'string') {
        const raw = original.$value as string
        if (raw.startsWith('{') && raw.endsWith('}')) {
          referencePath = raw.slice(1, -1)
        } else {
          referencePath = raw
        }
      }

      result.push({
        id: keyPath.join(' / '),
        category,
        typeLabel,
        name,
        cssVarName: name,
        value: record.$value,
        path: keyPath.join(' / '),
        tokenType,
        referencePath: category === 'primitive' ? '' : referencePath?.split('.').join(' / '),
      })
      return
    }

    Object.keys(record).forEach(childKey => {
      if (metaKeys.has(childKey)) return
      walk(record[childKey], [...keyPath, childKey])
    })
  }

  if (source && typeof source === 'object') {
    Object.keys(source as Record<string, unknown>).forEach(topKey => {
      walk((source as Record<string, unknown>)[topKey], [topKey])
    })
  }

  return result
}

type TokenOverviewProps = {
  component?: string
}

export const TokenOverview = ({ component }: TokenOverviewProps): React.ReactElement => {
  const [categoryFilter, setCategoryFilter] = React.useState<TokenCategory>('all')
  const [typeFilter, setTypeFilter] = React.useState<string>('all')
  const [searchQuery, setSearchQuery] = React.useState<string>('')

  const flattened = React.useMemo(() => flattenTokens(tokens), [])

  const typeOptions = React.useMemo(() => {
    const set = new Set<string>()
    flattened.forEach(token => {
      if (token.typeLabel) set.add(token.typeLabel)
    })
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  }, [flattened])

  const filteredTokens = React.useMemo(() => {
    return flattened.filter(token => {
      if (component) {
        const componentPrefix = component.startsWith('ds-')
          ? component.slice(4).toLowerCase()
          : component.toLowerCase()
        if (!token.typeLabel.toLowerCase().includes(componentPrefix)) {
          return false
        }
      }

      if (categoryFilter !== 'all' && token.category !== categoryFilter) {
        return false
      }

      if (typeFilter !== 'all' && token.typeLabel !== typeFilter) {
        return false
      }

      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase()
        const haystack = `${token.name} ${token.cssVarName} ${token.path} ${String(token.value)} ${
          token.referencePath || ''
        }`.toLowerCase()
        if (!haystack.includes(q)) {
          return false
        }
      }

      return true
    })
  }, [flattened, categoryFilter, typeFilter, searchQuery])

  return (
    <div className="my-large">
      {!component && (
        <div className="flex flex-wrap gap-small mb-small align-items-center">
          <div className="mr-small">
            <label className="text-small font-weight-bold mr-x-small" htmlFor="token-category-filter">
              Category
            </label>
            <select
              id="token-category-filter"
              className="select is-small"
              value={categoryFilter}
              onChange={event => setCategoryFilter(event.target.value as TokenCategory)}
            >
              <option value="all">All</option>
              <option value="primitive">🧱 Primitive</option>
              <option value="semantic">🏷️ Semantic</option>
              <option value="component">🧩 Component</option>
            </select>
          </div>
          <div className="mr-small">
            <label className="text-small font-weight-bold mr-x-small" htmlFor="token-type-filter">
              Type
            </label>
            <select
              id="token-type-filter"
              className="select is-small"
              value={typeFilter}
              onChange={event => setTypeFilter(event.target.value)}
            >
              <option value="all">All types</option>
              {typeOptions.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-grow-1 min-width-0">
            <label className="text-small font-weight-bold mr-x-small" htmlFor="token-search">
              Search
            </label>
            <input
              id="token-search"
              type="search"
              className="input is-small w-100"
              placeholder="Search by name, variable, value, or path"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          </div>
        </div>
      )}
      <div className="bg-grey-light radius px-large pb-large" style={{ maxHeight: '680px', overflowY: 'auto' }}>
        <div
          className="bg-grey-light"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 1fr) minmax(0, 2fr)',
            rowGap: '0.5rem',
            alignItems: 'stretch',
          }}
        >
          <div
            className="pt-large pb-normal font-weight-bold text-uppercase text-primary border-bottom-primary bg-grey-light title"
            style={{ position: 'sticky', top: 0, zIndex: 1, fontSize: 'var(--ds-table-head-font-size)' }}
          >
            Token
          </div>
          <div
            className="pt-large pb-normal font-weight-bold text-uppercase text-primary border-bottom-primary bg-grey-light title"
            style={{ position: 'sticky', top: 0, zIndex: 1, fontSize: 'var(--ds-table-head-font-size)' }}
          >
            Type
          </div>
          <div
            className="pt-large pb-normal font-weight-bold text-uppercase text-primary border-bottom-primary bg-grey-light title"
            style={{ position: 'sticky', top: 0, zIndex: 1, fontSize: 'var(--ds-table-head-font-size)' }}
          >
            Value
          </div>

          {filteredTokens.map(token => (
            <React.Fragment key={token.id}>
              <div className="py-x-small border-bottom-grey text-small">
                <Clipboard label={token.cssVarName} value={`var(--${token.cssVarName})`} />
                <br />
                <span className="block text-x-small text-grey pt-small">{token.path}</span>
                {token.referencePath && (
                  <span className="block text-x-small text-grey pt-small">
                    ↪ {token.referencePath.replace(/^\.\//, '/')}
                  </span>
                )}
              </div>
              <div className="py-x-small border-bottom-grey text-small flex gap-small align-items-center justify-content-start">
                {(component ? token.tokenType : token.typeLabel) || '—'}
              </div>
              <div
                className="py-x-small border-bottom-grey text-small flex gap-small align-items-start justify-content-center flex-direction-column"
                style={{ wordBreak: 'break-all' }}
              >
                <div className="flex gap-small align-items-center justify-content-start">
                  {token.tokenType === 'color' && (
                    <div
                      className="radius"
                      style={{
                        width: '24px',
                        height: '24px',
                        backgroundColor: `var(--${token.cssVarName})`,
                        border: '2px solid var(--ds-color-grey-3)',
                      }}
                    ></div>
                  )}
                  <span className="text-small">{String(token.value)}</span>
                </div>
                {/* {token.referencePath && <span className="block text-x-small text-grey">↪ {token.referencePath}</span>} */}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
