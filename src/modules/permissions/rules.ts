import { rule } from 'graphql-shield';

import { Context } from '@types';

export const isAuthenticatedUser = rule({
  cache: 'contextual',
})(
  (parent, args, ctx: Context) =>
    Boolean(ctx.user) && !Boolean(ctx.user.deletedAt),
);
