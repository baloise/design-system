export const ROOT_BRANDS = ['baloise', 'helvetia'] as const
export const ROOT_REGIONS = ['CH', 'DE', 'BE', 'LU', 'AT', 'ES', 'IT'] as const

export interface RootCustomEvent<T> extends CustomEvent<T> {
  detail: T
  target: HTMLDsRootElement
}

/**
 * @deprecated Use `RootCustomEvent` instead.
 */
export type AppCustomEvent<T> = RootCustomEvent<T>
