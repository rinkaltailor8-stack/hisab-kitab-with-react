import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Hisab() {
  const [form, setForm] = useState({ date: '', earnedAmount: '', spentAmount: '', balanceAmount: '' });
  const [list, setList] = useState([]);
  const [error, setError] = useState('');

  const fetchList = async () => {
    try {
      const { data } = await api.get('/hisab');
      setList(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch hisab');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/hisab/add', {
        date: form.date,
        earnedAmount: Number(form.earnedAmount || 0),
        spentAmount: Number(form.spentAmount || 0),
        balanceAmount: Number(form.balanceAmount || 0),
        balanceSpentAmount: Number(form.balanceSpentAmount || 0),
      });
      setForm({ date: '', earnedAmount: '', spentAmount: '', balanceAmount: '', balanceSpentAmount: '' });
      setIsSuccess(true)
      fetchList();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add hisab');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="grid gap-4">
      <div className="card">
        <h3 className="text-xl font-semibold">Add Daily Hisab</h3>
        <form onSubmit={submit} className="grid gap-3 max-w-lg">
          <input className="input" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required />
          <input className="input" placeholder="Earned amount" type="number" min="0" value={form.earnedAmount} onChange={(e) => setForm((f) => ({ ...f, earnedAmount: e.target.value }))} />
          <input className="input" placeholder="Spent amount" type="number" min="0" value={form.spentAmount} onChange={(e) => setForm((f) => ({ ...f, spentAmount: e.target.value }))} />
          <input className="input" placeholder="Balance Amount" type="number" min="0" value={form.balanceAmount} onChange={(e) => setForm((f) => ({ ...f, balanceAmount: e.target.value }))} />
          <input className="input" placeholder="Balance Spent Amount" type="number" min="0" value={form.balanceSpentAmount} onChange={(e) => setForm((f) => ({ ...f, balanceSpentAmount: e.target.value }))} />
          {error && <div className="text-red-600">{error}</div>}
          <button className="btn">Save</button>
        </form>
        <p className="text-gray-500 mt-2">Note: Total amount is auto-calculated in backend as earned + spent.</p>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold">History</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Earned</th>
                <th>Spent</th>
                <th>Total</th>
                <th>Balance Amount</th>
                <th>Balance Spent Amount</th>
              </tr>
            </thead>
            <tbody>
              {list.map((h) => (
                <tr key={h._id}>
                  <td>{new Date(h.date).toLocaleDateString()}</td>
                  <td>₹{(h.earnedAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.spentAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.totalAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.balanceSpentAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.balanceAmount || 0).toFixed(2)}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-gray-500">No records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
