import { unauthorized } from 'boom';
import { compare, hash } from 'bcryptjs';

import { Context } from '@types';
import { testPasswordStrength } from '@modules/auth/auth.utils';

import { User } from './user.model';

export default class UserController {
  /**
   * Get user profile.
   */
  public static fetchMe = async (ctx: Context) => ctx.user;

  /**
   * Update user.
   */
  public static updateUser = async ({
    _id,
    ...dataToUpdate
  }: Record<string, any>) => {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        $set: dataToUpdate,
      },
      { new: true },
    );

    return user;
  };

  /**
   * Update user password.
   */
  public static updateUserPassword = async ({
    email,
    currentPassword,
    newPassword,
  }: Record<string, any>) => {
    const user = await User.findOne({ email });
    const newPasswordHashed = await hash(newPassword, 10);
    const { error } = testPasswordStrength(newPassword);

    let isPasswordRight = null;

    try {
      if (user) {
        isPasswordRight = await compare(currentPassword, user.password);
      }
    } catch {
      isPasswordRight = false;
    }

    if (error) {
      throw new Error(error);
    }

    if (!user || !isPasswordRight) {
      return unauthorized('Your current password is incorrect');
    }

    await User.findByIdAndUpdate(
      user.id,
      {
        $set: { password: newPasswordHashed },
      },
      { new: true },
    );

    return { user };
  };
}
