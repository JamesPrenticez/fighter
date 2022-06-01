const processReducer = (state = {}, action) => {
  switch (action.type) {
    case "PROCESS":
      return { ...action.payload }
    default:
      return state
  }
}

export default processReducer