import mongoose from "mongoose";
import { isNamedTupleMember } from "typescript";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },
    verifiedEmail: {
      type: Boolean,
      required: true,
      default: false,
    },
    cart: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          requied: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    orders: [
      {
        id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          requied: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
        },
        orderedAt: {
          type: Date,
          required: true,
        },
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.user || mongoose.model("user", userSchema);
