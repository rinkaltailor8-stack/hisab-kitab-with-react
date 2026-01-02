import mongoose from 'mongoose';

const hisabSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: Date, required: true },
    earnedAmount: { type: Number, default: 0, min: 0 },
    spentAmount: { type: Number, default: 0, min: 0 },
    totalAmount: { type: Number, required: true }, // auto-calculated
    balanceAmount: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

hisabSchema.pre('validate', function (next) {
  this.totalAmount = Number(this.earnedAmount || 0) + Number(this.spentAmount || 0);
});

export default mongoose.models.Hisab || mongoose.model('Hisab', hisabSchema);
