import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter a username'],
    maxlength: [20, 'username cannot be more than 20 characters'],
    minlength: [3, 'username must be at least 3 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    maxlength: [20, 'password cannot be more than 20 characters'],
    minlength: [3, 'password must be at least 3 characters'],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
