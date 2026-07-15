import IMask from 'imask'
import { DateTime } from 'luxon'
import type { DsRegion } from '@global'

export type DateDisplayFormat = 'dd.MM.yyyy' | 'dd/MM/yyyy'

export function getDisplayFormat(region: DsRegion): DateDisplayFormat {
  if (region === 'BE') return 'dd/MM/yyyy'
  return 'dd.MM.yyyy'
}

function getDivider(format: DateDisplayFormat): string {
  return format === 'dd/MM/yyyy' ? '/' : '.'
}

function getMaskPattern(format: DateDisplayFormat): string {
  if (format === 'dd/MM/yyyy') return 'd{/}m{/}Y'
  return 'd{.}m{.}Y'
}

// 00–49 → 2000–2049, 50–99 → 1950–1999
function expandTwoDigitYear(yy: number): number {
  return yy <= 49 ? 2000 + yy : 1900 + yy
}

function parseShortDate(raw: string, divider: string): Date | null {
  const parts = raw.split(divider)
  if (parts.length !== 3) return null

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)
  const yearStr = parts[2].trim()

  if (isNaN(day) || isNaN(month) || !yearStr) return null
  if (day < 1 || day > 31 || month < 1 || month > 12) return null

  let year: number
  if (yearStr.length <= 2) {
    const yy = parseInt(yearStr, 10)
    if (isNaN(yy)) return null
    year = expandTwoDigitYear(yy)
  } else if (yearStr.length === 4) {
    year = parseInt(yearStr, 10)
    if (isNaN(year)) return null
  } else {
    return null
  }

  const dt = DateTime.fromObject({ day, month, year })
  return dt.isValid ? dt.toJSDate() : null
}

export function isoToDisplay(isoValue: string | null, format: DateDisplayFormat): string {
  if (!isoValue) return ''
  const dt = DateTime.fromISO(isoValue)
  return dt.isValid ? dt.toFormat(format) : ''
}

export interface DateMaskConfig {
  inputEl: HTMLInputElement
  format: DateDisplayFormat
  initialValue: string | null
  onAccept: (iso: string | null) => void
  onComplete: (iso: string) => void
}

export function createDateMask(config: DateMaskConfig): DateMask {
  const mask = new DateMask(config.inputEl, config.format, config.onAccept, config.onComplete)
  if (config.initialValue) {
    mask.syncFromISO(config.initialValue)
    mask.setLazy(false)
  }
  return mask
}

export class DateMask {
  private mask: any
  private format: DateDisplayFormat

  constructor(
    private inputEl: HTMLInputElement,
    format: DateDisplayFormat,
    private onAccept: (isoValue: string | null) => void,
    private onComplete: (isoValue: string) => void,
  ) {
    this.format = format
    this.create()
  }

  // IMask won't auto-advance on a single-digit day or month because the value
  // could still be extended (e.g. "1" → "10"–"19"). We intercept the divider
  // keydown, pad the incomplete segment, and advance the cursor manually.
  private onDividerKey = (event: KeyboardEvent) => {
    const divider = getDivider(this.format)
    if (event.key !== divider) return
    const raw = this.inputEl.value.substring(0, this.inputEl.selectionStart ?? 0)
    const escapedDivider = divider === '.' ? '\\.' : '/'

    // Single-digit day: "3" → pad to "03."
    if (/^\d$/.test(raw)) {
      event.preventDefault()
      const padded = `0${raw}${divider}`
      this.mask.value = padded
      this.inputEl.setSelectionRange(padded.length, padded.length)
      return
    }

    // Single-digit month after day: "3.1" → pad to "03.01."
    if (new RegExp(`^\\d{1,2}${escapedDivider}\\d$`).test(raw)) {
      event.preventDefault()
      const [day, month] = raw.split(divider)
      const padded = `${day}${divider}0${month}${divider}`
      this.mask.value = padded
      this.inputEl.setSelectionRange(padded.length, padded.length)
    }
  }

  private create() {
    this.inputEl.addEventListener('keydown', this.onDividerKey)
    const fmt = this.format
    this.mask = IMask(this.inputEl, {
      mask: Date,
      pattern: getMaskPattern(fmt),
      lazy: true,
      overwrite: true,
      autofix: true,
      format: (date: Date) => DateTime.fromJSDate(date).toFormat(fmt),
      parse: (str: string) => DateTime.fromFormat(str, fmt).toJSDate(),
      blocks: {
        d: { mask: IMask.MaskedRange, from: 1, to: 31, maxLength: 2 },
        m: { mask: IMask.MaskedRange, from: 1, to: 12, maxLength: 2 },
        // Allow 0–9999 so 2-digit years like "01" aren't rejected at input time;
        // short years are expanded to 4 digits on blur via expandShortInput().
        Y: { mask: IMask.MaskedRange, from: 0, to: 9999, maxLength: 4 },
      },
    } as any)

    this.mask.on('accept', () => {
      this.onAccept(this.getISO())
    })

    this.mask.on('complete', () => {
      const iso = this.getISO()
      if (iso) this.onComplete(iso)
    })
  }

  private getISO(): string | null {
    const typed = this.mask?.typedValue as Date | undefined
    if (!typed || isNaN(typed.getTime())) return null
    const dt = DateTime.fromJSDate(typed)
    return dt.isValid ? (dt.toISODate() ?? null) : null
  }

  setLazy(lazy: boolean) {
    this.mask?.updateOptions({ lazy })
  }

  syncFromISO(isoValue: string | null) {
    if (!this.mask) return
    if (!isoValue) {
      this.mask.value = ''
      return
    }
    const dt = DateTime.fromISO(isoValue)
    if (dt.isValid) {
      this.mask.typedValue = dt.toJSDate()
    }
  }

  expandShortInput(): boolean {
    if (!this.mask) return false
    const date = parseShortDate(this.inputEl.value.replace(/_/g, ''), getDivider(this.format))
    if (!date) return false
    this.mask.typedValue = date
    return true
  }

  clearIfIncomplete() {
    if (!this.mask) return
    if (this.expandShortInput()) return
    const typed = this.mask.typedValue as Date | undefined
    if (!typed || isNaN(typed.getTime())) {
      this.mask.value = ''
    }
  }

  updateFormat(format: DateDisplayFormat) {
    if (format === this.format) return
    const iso = this.getISO()
    this.format = format
    this.mask?.destroy()
    this.create()
    if (iso) this.syncFromISO(iso)
  }

  destroy() {
    this.inputEl.removeEventListener('keydown', this.onDividerKey)
    this.mask?.destroy()
    this.mask = undefined
  }
}
