import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function UdharDetail() {
  const { id } = useParams();
  const [khata, setKhata] = useState(null);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', amount: '', reason: '' });
  const [error, setError] = useState('');

  const fetchDetail = async () => {
    try {
      const { data } = await api.get(`/udhar/${id}`);
      setKhata(data.khata);
      setEntries(data.entries);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch details');
    }
  };

  const addEntry = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/udhar/add-entry', {
        udharKhataId: id,
        date: form.date,
        amount: Number(form.amount || 0),
        reason: form.reason,
      });
      setForm({ date: '', amount: '', reason: '' });
      fetchDetail();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add entry');
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return (
    <div className="grid gap-4">
      <div className="card">
        <h3 className="text-xl font-semibold">
          {khata ? `${khata.personName} — Total: ₹${(khata.totalAmount || 0).toFixed(2)}` : 'Loading...'}
        </h3>
        <form onSubmit={addEntry} className="grid gap-3 max-w-lg">
          <input className="input" type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} required />
          <input className="input" placeholder="Amount" type="number" min="0" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} required />
          <input className="input" placeholder="Reason" value={form.reason} onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))} />
          {error && <div className="text-red-600">{error}</div>}
          <button className="btn">Add Entry</button>
        </form>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold">Udhar history</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((en) => (
                <tr key={en._id}>
                  <td>{new Date(en.date).toLocaleDateString()}</td>
                  <td>₹{(en.amount || 0).toFixed(2)}</td>
                  <td>{en.reason || '-'}</td>
                </tr>
              ))}
              {entries.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-gray-500">No entries yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
