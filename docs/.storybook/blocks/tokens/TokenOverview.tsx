import tokens from '@baloise/ds-tokens/dist/docs/base.tokens.json'
import React from 'react'
import { Clipboard } from '../Clipboard'

type TokenCategory = 'all' | 'global' | 'alias' | 'component'

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
  if (key.includes('🌐') || /global/i.test(key)) return 'global'
  if (key.includes('🔗') || /alias/i.test(key)) return 'alias'
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
        referencePath: category === 'global' ? '' : referencePath?.split('.').join(' / '),
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

const filterControlStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: 'var(--ds-alias-text-color-grey)',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
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
        const componentPrefix = component.startsWith('ds-') ? component.slice(4).toLowerCase() : component.toLowerCase()
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
    <div className="my-lg">
      {!component && (
        <div
          className="flex flex-wrap gap-sm mb-sm align-items-end p-sm bg-white radius"
          style={{ border: '1px solid var(--ds-form-field-control-border-color)' }}
        >
          <div style={filterControlStyle}>
            <label style={labelStyle} htmlFor="token-category-filter">
              Category
            </label>
            <div className="select">
              <select
                id="token-category-filter"
                value={categoryFilter}
                onChange={event => setCategoryFilter(event.target.value as TokenCategory)}
              >
                <option value="all">All</option>
                <option value="global">🌐 Global</option>
                <option value="alias">🔗 Alias</option>
                <option value="component">🧩 Component</option>
              </select>
            </div>
          </div>

          <div style={filterControlStyle}>
            <label style={labelStyle} htmlFor="token-type-filter">
              Type
            </label>
            <div className="select">
              <select
                id="token-type-filter"
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
          </div>

          <div style={{ ...filterControlStyle, flex: '1 1 200px' }}>
            <label style={labelStyle} htmlFor="token-search">
              Search
            </label>
            <input
              id="token-search"
              type="search"
              className="input"
              style={{ display: 'block', width: '100%' }}
              placeholder="Name, variable, value…"
              value={searchQuery}
              onChange={event => setSearchQuery(event.target.value)}
            />
          </div>

          <div
            className="text-sm text-grey"
            style={{ paddingBottom: '0.75rem', whiteSpace: 'nowrap' }}
          >
            {filteredTokens.length} token{filteredTokens.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      <div style={{ borderTop: '2px solid var(--ds-alias-border-color-primary)', borderBottom: '2px solid var(--ds-alias-border-color-primary)', overflow: 'hidden' }}>
        <div style={{ maxHeight: '640px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '45%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
            <thead>
              <tr style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                {(['Token', 'Type', 'Value'] as const).map(col => (
                  <th
                    key={col}
                    className="text-sm font-weight-bold text-primary bg-white"
                    style={{
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      borderBottom: '2px solid var(--ds-alias-border-color-primary)',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTokens.map((token, index) => (
                <tr
                  key={token.id}
                  style={{ backgroundColor: index % 2 === 0 ? 'var(--ds-alias-background-color-white)' : 'var(--ds-alias-background-color-grey-lighter)' }}
                >
                  <td style={{ padding: '0.5rem 1rem', borderBottom: '2px solid var(--ds-alias-border-color-grey)', verticalAlign: 'top' }}>
                    <Clipboard label={`--${token.cssVarName}`} value={`var(--${token.cssVarName})`} />
                    <div className="text-xs text-grey" style={{ marginTop: '2px' }}>
                      {token.path}
                    </div>
                    {token.referencePath && (
                      <div className="text-xs text-grey" style={{ marginTop: '2px' }}>
                        ↪ {token.referencePath.replace(/^\.\//, '/')}
                      </div>
                    )}
                  </td>
                  <td
                    className="text-sm text-grey"
                    style={{ padding: '0.5rem 1rem', borderBottom: '2px solid var(--ds-alias-border-color-grey)', verticalAlign: 'top' }}
                  >
                    {(component ? token.tokenType : token.typeLabel) || '—'}
                  </td>
                  <td style={{ padding: '0.5rem 1rem', borderBottom: '2px solid var(--ds-alias-border-color-grey)', verticalAlign: 'top', wordBreak: 'break-all' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {token.tokenType === 'color' && (
                        <span
                          style={{
                            display: 'inline-block',
                            flexShrink: 0,
                            width: '20px',
                            height: '20px',
                            borderRadius: 'var(--ds-alias-radius-base)',
                            backgroundColor: `var(--${token.cssVarName})`,
                            border: '1px solid var(--ds-alias-border-color-grey-light)',
                            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.06)',
                          }}
                        />
                      )}
                      <span className="text-sm">{String(token.value)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
