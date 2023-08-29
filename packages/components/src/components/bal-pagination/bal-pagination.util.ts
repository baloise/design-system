export type PaginationControlType = 'page' | 'dots'

export type PaginationControl = {
  type: PaginationControlType
  label: string
  active: boolean
}

export function generatePaginationControl(value: number, totalPages: number, pageRange: number): any {
  const paginationArray = []

  if (value > totalPages || value < 0) {
    value = 1
  }

  if (totalPages <= 0) {
    totalPages = 10
  }

  if (pageRange <= 0) {
    pageRange = 1
  }

  const numberOfPages = 5 + pageRange * 2

  if (totalPages <= numberOfPages) {
    for (let i = 1; i <= totalPages; i++) {
      paginationArray.push({
        type: 'page',
        label: i.toString(),
        active: i === value,
      })
    }
  } else {
    if (value <= numberOfPages - 2 - pageRange) {
      for (let i = 1; i <= numberOfPages - 2; i++) {
        paginationArray.push({
          type: 'page',
          label: i.toString(),
          active: i === value,
        })
      }
      paginationArray.push({ type: 'dots', label: '...', active: false })
      paginationArray.push({
        type: 'page',
        label: totalPages.toString(),
        active: false,
      })
    } else if (value >= totalPages - 3) {
      paginationArray.push({
        type: 'page',
        label: '1',
        active: false,
      })
      paginationArray.push({ type: 'dots', label: '...', active: false })
      for (let i = totalPages - numberOfPages + 3; i <= totalPages; i++) {
        paginationArray.push({
          type: 'page',
          label: i.toString(),
          active: i === value,
        })
      }
    } else {
      paginationArray.push({
        type: 'page',
        label: '1',
        active: false,
      })
      paginationArray.push({ type: 'dots', label: '...', active: false })

      const page = Number(value)

      for (let i = page - pageRange; i <= page + pageRange; i++) {
        paginationArray.push({
          type: 'page',
          label: i.toString(),
          active: i === value,
        })
      }
      paginationArray.push({ type: 'dots', label: '...', active: false })
      paginationArray.push({
        type: 'page',
        label: totalPages.toString(),
        active: false,
      })
    }
  }

  return paginationArray
}
