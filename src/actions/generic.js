import {
  togglePageAction,
  resetErrorsResponseAction
} from './genericCreateAction';

/* Переключение страниц в пагинации */
export const togglePage = (page) => togglePageAction(page);

export const resetErrorsResponse = () => resetErrorsResponseAction();
