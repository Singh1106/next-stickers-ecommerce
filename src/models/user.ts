import mongoose from "mongoose";
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
    isAdmin: {
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
    tempEmailVerifyToken: {
      code: {
        type: String,
      },
      expiry: {
        type: Date,
      },
    },
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
        status: {
          type: String,
          requied: true,
          default: "Accepted",
        },
        orderedAt: {
          type: Date,
          required: true,
        },
      },
    ],
    messagesWithAdmin: [
      {
        fromAdmin: {
          type: Boolean,
          required: true,
          default: false,
        },
        sentAt: {
          type: Date,
          required: true,
          default: new Date(),
        },
        message: {
          type: String,
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
