export const requestAction = (state) => ({
  ...state,
  loader: true,
  error: false
});

export const successAction = (state) => ({
  ...state,
  loader: false,
  error: false
});

export const failureAction = (state) => ({
  ...state,
  loader: false,
  error: true
});
