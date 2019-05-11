export const mainType = {
  warningSet: 'SET-WARNING',
  warningStop: 'STOP-WARNING'
}
const initialState = {
  warning: {
    status: false,
    message: null
  }
}
export const mainReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case mainType.warningSet: {
      return {
        ...state,
        warning: {
          status: action.status,
          message: action.message === undefined ? null : action.message
        }
      }
    }
    case mainType.warningStop: {
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
