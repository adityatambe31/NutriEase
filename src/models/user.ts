import mongoose, { Schema, model } from "mongoose";

// Define AuthRole as a constant object with frozen values
const AuthRole = Object.freeze({
  USER: "USER",
  ADMIN: "ADMIN",
  DEVELOPER: "DEVELOPER",
});

export interface UserDocument {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  provider?: string;
  providerAccounts?: string[]; // Array of linked provider IDs
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: 255,
    },
    email: {
      type: String,
      unique: true, // This ensures email uniqueness across providers
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
      maxlength: 255,
      index: true, // Add index for faster email lookups
    },
    password: {
  type: String,
  required: function (this: { provider?: string }): boolean {
    return !this.provider;
  },
},
    image: {
      type: String,
    },
    provider: {
      type: String,
    },
    providerAccounts: {
      type: [String], // Array of provider accounts connected to this user
      default: [],
    },
    role: {
      type: String,
      enum: Object.values(AuthRole),
      default: AuthRole.USER,
    },
  },
  { timestamps: true },
);

// Add a compound index for email and provider to handle multiple auth providers
UserSchema.index({ email: 1 });

// Method to add a new provider account to the user
UserSchema.methods.addProviderAccount = function (providerId: string) {
  if (!this.providerAccounts.includes(providerId)) {
    this.providerAccounts.push(providerId);
  }
};

export { AuthRole };

// Check if the model already exists to prevent recompilation error in development
const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
