import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  supabaseId: { type: String, sparse: true, unique: true }, // For Google auth, optional
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['PATIENT', 'DOCTOR', 'ADMIN'], required: true },
  fullName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'], required: true },
  photoUrl: { type: String, default: '' },
  pushToken: { type: String, default: '' }, // For Expo notifications
}, { timestamps: true });

// Hash password for normal auth
userSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

export default mongoose.model('User', userSchema);