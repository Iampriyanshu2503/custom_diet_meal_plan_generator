import React, { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'active', label: 'Active' },
  { value: 'very active', label: 'Very Active' },
];

const goals = [
  { value: 'weight loss', label: 'Weight Loss' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'weight gain', label: 'Weight Gain' },
  { value: 'muscle gain', label: 'Muscle Gain' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await userAPI.getProfile();
        setProfile(data.user);
        setForm({ ...data.user });
      } catch (err) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await userAPI.updateProfile(form);
      setSuccess(true);
      setProfile({ ...form });
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!form) return null;

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ''}
            className="input-modern w-full bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="number"
            name="age"
            value={form.age || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gender</label>
          <select
            name="gender"
            value={form.gender || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          >
            <option value="">Select gender</option>
            {genders.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={form.height || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={form.weight || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Activity Level</label>
          <select
            name="activityLevel"
            value={form.activityLevel || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          >
            <option value="">Select activity level</option>
            {activityLevels.map(a => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Goal</label>
          <select
            name="goal"
            value={form.goal || ''}
            onChange={handleChange}
            className="input-modern w-full"
            required
          >
            <option value="">Select goal</option>
            {goals.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {success && <div className="text-green-600 text-center">Profile updated!</div>}
        <button
          type="submit"
          className="btn-primary w-full py-3 rounded-xl font-semibold text-lg"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile; 