/// <reference types="cypress" />

export interface Selectable<T> {
  select(indexes: number[] | number | string): T

  assertIsSelected(indexes: number[] | number | string): T
}
