export const TOGGLE_PAGE = 'TOGGLE_PAGE';
export const RESET_ERRORS_RESPONSE = 'RESET_ERRORS_RESPONSE';

/* Переключение страниц в пагинации */
export const togglePage = (page) => ({
  type: TOGGLE_PAGE,
  payload: page
});

export const resetErrorsResponse = () => ({ type: RESET_ERRORS_RESPONSE });
