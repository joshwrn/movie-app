import { AuthenticationError, UserInputError } from 'apollo-server-micro';
import { createUser, findUser, validatePassword } from '../lib/user';
import { setLoginSession, getLoginSession } from '../lib/auth';
import { removeTokenCookie } from '../lib/auth-cookies';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const resolvers = {
  Query: {
    async viewer(_parent, _args, context, _info) {
      try {
        const session = await getLoginSession(context.req);

        if (session) {
          return findUser({ email: session.email });
        }
      } catch (error) {
        throw new AuthenticationError(
          'Authentication token is invalid, please log in'
        );
      }
    },
  },
  Mutation: {
    async signUp(_parent, args, _context, _info) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(args.password, saltRounds);
      const user = new User({
        password: passwordHash,
        email: args.email,
        createdAt: Date.now(),
      });
      await user.save();
      return { user };
    },
    async signIn(_parent, args, context, _info) {
      // const user = await findUser({ email: args.input.email })
      const user = await User.findOne({ email: args.input.email });

      if (!user) throw new Error('User not found');
      const isValid = args.input.password === user.password;
      // const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid password');

      if (isValid) {
        const session = {
          id: user.id,
          email: user.email,
        };
        console.log('isValid', session);
        // setLoginSession(context.req, session);
        return { user };
      }

      throw new UserInputError('Invalid email and password combination');
    },
    async signOut(_parent, _args, context, _info) {
      removeTokenCookie(context.res);
      return true;
    },
  },
};
