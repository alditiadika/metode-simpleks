export const firstComponentType = {
  set: 'SET-ON-FIRST-COMPONENT',
  changeMainEQ: 'CHANGE-COMPONENT-BY-INDEX',
  changeSubEQ: 'CHANEG COMPONENT BY ID IN SUB EQ',
  next: 'TO NEXT ACTION',
  end: 'READ_ONLY_SHOW'
}
const initialState = {
  isOpen: false,
  isOpenConstraint: false,
  isReadOnly: false,
  nVar: 0,
  optimalEq: [],
  constraint: {
    matrix: [],
    stringEQ: []
  }
}
export const firstComponentReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case firstComponentType.set: {
      return {
        ...state,
        isOpen: true,
        isOpenConstraint: false,
        isReadOnly: false,
        nVar: action.payload,
        optimalEq: new Array(action.payload)
          .fill(0)
          .map((_, i) => ({ key: i, value: 0 }))
      }
    }
    case firstComponentType.changeMainEQ: {
      return {
        ...state,
        optimalEq: state.optimalEq.map(e =>
          e.key === action.payload.key
            ? { ...e, value: action.payload.value }
            : { ...e }
        )
      }
    }
    case firstComponentType.next: {
      const row = state.nVar
      return {
        ...state,
        isOpenConstraint: true,
        isReadOnly: false,
        constraint: {
          matrix: setZeros(row, row + 2)
        }
      }
    }
    case firstComponentType.changeSubEQ: {
      const { key, value } = action.payload
      return {
        ...state,
        constraint: {
          ...state.constraint,
          matrix: state.constraint.matrix.map(row => {
            return row.map(col => {
              return col.key === key ? { ...col, value: value } : { ...col }
            })
          })
        }
      }
    }
    case firstComponentType.end: {
      const newMatrix = state.constraint.matrix
      let stringEQ = []
      for (let i = 0; i < newMatrix.length; i++) {
        const item = newMatrix[i]
        stringEQ.push(generator(item))
      }
      return {
        ...state,
        isReadOnly: true,
        isOpenConstraint: false,
        isOpen: false,
        constraint: {
          ...state.constraint,
          matrix: newMatrix,
          stringEQ: stringEQ
        }
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
const setZeros = (row, col) => {
  let arr = []
  for (let i = 0; i < row; i++) {
    arr.push([])
    for (let j = 0; j < col; j++) {
      j === col - 2
        ? arr[i].push({ key: null, value: null })
        : arr[i].push({ key: Math.random(), value: 0 })
    }
  }
  return arr
}
const generator = arr => {
  let a = ''
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].value !== null) {
      if (i > 0) {
        a =
          a +
          (arr[i].value >= 0
            ? `+ ${Math.abs(arr[i].value)}`
            : `- ${Math.abs(arr[i].value)}`) +
          `x_${i}`
      } else {
        a = a + arr[i].value + `x_${i}`
      }
    } else {
      a = a + '='
    }
  }
  a = a + arr[arr.length - 1].value
  return a
}
