import { createAction } from '@reduxjs/toolkit';

export const Action = {
  REDIRECT: 'route/redirect',
};

// ROUTING
export const redirectToRoute = createAction<string>(Action.REDIRECT);
