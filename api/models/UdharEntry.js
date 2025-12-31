import mongoose from 'mongoose';
import UdharKhata from './UdharKhata.js';

const udharEntrySchema = new mongoose.Schema(
  {
    udharKhataId: { type: mongoose.Schema.Types.ObjectId, ref: 'UdharKhata', required: true, index: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true, min: 0 },
    reason: { type: String, trim: true },
  },
  { timestamps: true }
);

udharEntrySchema.post('save', async function () {
  const khataId = this.udharKhataId;
  const agg = await this.constructor.aggregate([
    { $match: { udharKhataId: khataId } },
    { $group: { _id: '$udharKhataId', total: { $sum: '$amount' } } },
  ]);
  const total = agg.length ? agg[0].total : 0;
  await UdharKhata.findByIdAndUpdate(khataId, { totalAmount: total });
});

export default mongoose.models.UdharEntry || mongoose.model('UdharEntry', udharEntrySchema);
