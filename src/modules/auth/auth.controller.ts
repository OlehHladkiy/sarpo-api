import { compare, hash } from 'bcryptjs';
import { unauthorized } from 'boom';
import { sign, verify } from 'jsonwebtoken';

import { User } from '@modules/user/user.model';
import authConfig from '@config/authConfig';

import { testPasswordStrength } from './auth.utils';

interface Token {
  id: string;
}

export default class AuthController {
  /**
   * Generate JWT auth token.
   */
  public static generateAuthToken = (user: any) =>
    sign(user, authConfig.jwtSecret);

  /**
   * Register a new user.
   */
  public static signUp = async ({ email, name, password }: any) => {
    const userByEmail = await User.find({ email });
    const { error } = testPasswordStrength(password);

    if (error) {
      throw new Error(error);
    }

    if (userByEmail.length > 0) {
      return unauthorized(`Email address ${email} already registered`);
    }

    const hashedPassword = await hash(password, 10);
    const user: any = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = AuthController.generateAuthToken({ id: user.id });
    return { token, user: user ? user : null };
  };

  /**
   * Authenticate user with password.
   */
  public static signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const user: any = await User.findOne({ email });
    let isAuthenticated = false;

    // Verify password
    try {
      if (user) {
        isAuthenticated = await compare(password, user.password);
      }
    } catch (e) {
      isAuthenticated = false;
    }

    if (!user || !isAuthenticated) {
      return unauthorized('Email or password is invalid');
    }

    if (user && user.deletedAt) {
      return unauthorized('Account has been deleted.');
    }

    if (!user.profile) {
      user.profile = {};
    }

    const token = AuthController.generateAuthToken({ id: user.id });
    return { token, user };
  };

  /**
   * Decode authentication token.
   */
  public static decodeAuthToken = (encodedToken?: string) => {
    if (encodedToken) {
      const token = encodedToken.replace('Bearer ', '');
      const verifiedToken = verify(token, authConfig.jwtSecret) as Token;
      return verifiedToken;
    }
  };

  /**
   * Get user by authentication token.
   */
  public static getUserByAuthToken = async (encodedToken?: string) => {
    const token = AuthController.decodeAuthToken(encodedToken);

    if (token) {
      return await User.findById(token.id);
    }

    return null;
  };
}
