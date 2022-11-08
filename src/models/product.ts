import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String
    },
    image: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.product || mongoose.model('product', productSchema);
