export const firstComponentType = {
  set: 'SET-ON-FIRST-COMPONENT',
  changeMainEQ: 'CHANGE-COMPONENT-BY-INDEX',
  next: 'TO NEXT ACTION'
}
const initialState = {
  isOpen: false,
  isOpenConstraint: false,
  nVar: 0,
  optimalEq: [],
  constraint: {
    matrix: [],
    val: []
  }
}
export const firstComponentReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case firstComponentType.set: {
      return {
        ...state,
        isOpen: true,
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
      return {
        ...state,
        isOpenConstraint: true
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
