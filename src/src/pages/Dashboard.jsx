import { useEffect, useState } from 'react';
import api from '../services/api';
import Card from '../components/Card';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [hisab, setHisab] = useState([]);
  const [udhar, setUdhar] = useState([]);
  const [personName, setPersonName] = useState('');
  const [error, setError] = useState('');

  const fetchAll = async () => {
    try {
      const [hisabRes, udharRes] = await Promise.all([api.get('/hisab'), api.get('/udhar')]);
      setHisab(hisabRes.data);
      setUdhar(udharRes.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    }
  };

  const addPerson = async (e) => {
    e.preventDefault();
    setError('');
    if (!personName.trim()) return;
    try {
      await api.post('/udhar/add-person', { personName });
      setPersonName('');
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add person');
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const totalEarned = hisab.reduce((sum, h) => sum + (h.earnedAmount || 0), 0);
  const totalSpent = hisab.reduce((sum, h) => sum + (h.spentAmount || 0), 0);
  const totalUdhar = udhar.reduce((sum, u) => sum + (u.totalAmount || 0), 0);

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card title="Total Earned" value={`₹${totalEarned.toFixed(2)}`} />
        <Card title="Total Spent" value={`₹${totalSpent.toFixed(2)}`} />
        <Card title="Total Udhar" value={`₹${totalUdhar.toFixed(2)}`} />
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold">Udhar Khata</h3>
        <form onSubmit={addPerson} className="flex gap-2 my-3">
          <input className="input" placeholder="Add person name" value={personName} onChange={(e) => setPersonName(e.target.value)} />
          <button className="btn">Add</button>
        </form>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Person</th>
                <th>Total Udhar</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {udhar.map((u) => (
                <tr key={u._id}>
                  <td><Link className="text-blue-700" to={`/udhar/${u._id}`}>{u.personName}</Link></td>
                  <td>₹{(u.totalAmount || 0).toFixed(2)}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {udhar.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-gray-500">No persons yet. Add one above.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold">Recent Hisab</h3>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Earned</th>
                <th>Spent</th>
                <th>Total</th>
                <th>Balance Spent</th>
              </tr>
            </thead>
            <tbody>
              {hisab.slice(0, 10).map((h) => (
                <tr key={h._id}>
                  <td>{new Date(h.date).toLocaleDateString()}</td>
                  <td>₹{(h.earnedAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.spentAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.totalAmount || 0).toFixed(2)}</td>
                  <td>₹{(h.balanceAmount || 0).toFixed(2)}</td>
                </tr>
              ))}
              {hisab.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-gray-500">No daily records yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
