import { connectDB } from '@/lib/connectDB';
import User from '@/models/User';

export async function POST(req, res) {
  try {
    const { email, password, csrfToken } = await req.json();
    // console.log('reqbody', email, password);
    await connectDB();
    if (!email && !password) {
      return Response.json(
        { status: 'fail', message: 'Invalid credentials' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const existingUser = await User.findOne({ email: email });

    // If no existing user create a new one
    if (!existingUser) {
      const user = await User.create({ email, password, csrfToken });
      user.password = undefined;
      user.updatedAt = undefined;

      return Response.json(
        { status: 'success', message: 'Login Successfull', user },
        { status: 201, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If exisiting user
    const isValidPassword = await existingUser.comparePassword(
      password,
      existingUser.password
    );
    if (!isValidPassword) {
      return Response.json(
        { status: 'fail', message: 'Invalid credentials' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // If all correct
    return Response.json(
      {
        status: 'success',
        message: 'Logged in user',
        user: {
          email: existingUser.email,
          password: existingUser.password,
          csrfToken: existingUser.csrfToken,
        },
      },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    //
  } catch (err) {
    console.log(err.message);
    return Response.json(
      { status: 'fail', message: 'Internal server error' },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
