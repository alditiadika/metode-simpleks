const initialState = {
  test: 'test'
}

export const testReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case 'test': {
      return {
        ...state
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
