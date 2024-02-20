import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'No Name provide',
    },

    image: {
      type: String,
      default: 'https://placehold.co/300x300',
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    csrfToken: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = async function () {
  return await bcrypt.hash(this.password, 12);
};

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await this.hashPassword();
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// developement
// let User = (mongoose.models = {});
// User = mongoose.models.User || mongoose.model('User', userSchema);

// for production
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
