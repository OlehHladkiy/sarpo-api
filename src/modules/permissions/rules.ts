import { rule } from 'graphql-shield';

import { Context } from '@types';

export const isAuthenticatedUser = rule({
  cache: 'contextual',
})((_, __, ctx: Context) => Boolean(ctx.user));
