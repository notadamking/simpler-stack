import User from '../models/user';

exports.login = async (ctx, next) => {
  console.log(ctx.request);
  console.log(ctx.req);
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (!email || !password) {
    ctx.throw('You must provide an email and password.', 422);
  }

  const user = await User.findOne({ email });

  if (!user) { ctx.throw('Invalid email.', 422); }

  if (await !user.validatePassword(password)) {
    ctx.throw('Invalid email or password.', 422);
  }

  ctx.body = { token: user.getToken() };
};

exports.signup = async (ctx, next) => {
  ctx.log.info('\nREQUEST:\n' + ctx.request);
  ctx.log.info('\nREQ:\n' + ctx.req);
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;

  if (!email || !password) {
    ctx.throw('You must provide an email and password.', 422);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser !== null) {
    ctx.throw('Email is already in use.', 422);
  }

  const user = new User({ email });

  await user.setPassword(password);
  await user.save();
  // user.sendConfirmationEmail();

  ctx.body = { token: user.getToken() };
};
