import mongoose, { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// Define the User interface
export interface IUser {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a schema for the User model
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = models?.User || model<IUser>("User", userSchema);

// Export the User model
export default User;
