export const createList = (list) => {
  return (dispatch, getState) => {
    // Make async db call
    dispatch({ type: 'CREATE_LIST', list });
  };
};
