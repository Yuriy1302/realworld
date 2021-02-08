import {
  TOGGLE_PAGE,
  RESET_ERRORS_RESPONSE
} from '../config/configGeneric';

export const togglePageAction = (page) => ({
  type: TOGGLE_PAGE,
  payload: page
});

export const resetErrorsResponseAction = () => ({
  type: RESET_ERRORS_RESPONSE
});
