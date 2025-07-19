import React, { useEffect, useState, useRef, useCallback } from 'react';
import { userAPI } from '../services/api';
import { FaUser, FaEnvelope, FaVenusMars, FaRulerVertical, FaWeight, FaRunning, FaBullseye, FaBirthdayCake, FaCamera } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

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

const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=128';

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none -z-20">
    {[...Array(18)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/30 blur-2xl shadow-lg"
        style={{
          width: `${30 + Math.random() * 60}px`,
          height: `${30 + Math.random() * 60}px`,
          top: `${Math.random() * 90}%`,
          left: `${Math.random() * 90}%`,
          opacity: 0.5 + Math.random() * 0.3
        }}
        animate={{
          y: [0, Math.random() * 40 - 20, 0],
          x: [0, Math.random() * 40 - 20, 0],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 8 + Math.random() * 6,
          repeat: Infinity,
          repeatType: 'mirror',
          delay: Math.random() * 4
        }}
      />
    ))}
  </div>
);

const Profile = ({ darkMode, setDarkMode }) => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [validation, setValidation] = useState({});
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await userAPI.getProfile();
        setProfile(data.user);
        setForm({ ...data.user });
        setAvatar(data.user.avatar || null);
        setAvatarPreview(data.user.avatar || null);
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
    setValidation({ ...validation, [e.target.name]: '' });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setForm({ ...form, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const v = {};
    if (!form.name) v.name = 'Name is required';
    if (!form.age || form.age <= 0) v.age = 'Valid age required';
    if (!form.gender) v.gender = 'Gender required';
    if (!form.height || form.height <= 0) v.height = 'Valid height required';
    if (!form.weight || form.weight <= 0) v.weight = 'Valid weight required';
    if (!form.activityLevel) v.activityLevel = 'Activity level required';
    if (!form.goal) v.goal = 'Goal required';
    setValidation(v);
    return Object.keys(v).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    if (!validate()) return;
    setSaving(true);
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
    <div className={`min-h-screen w-full relative flex flex-col items-center justify-center transition-colors duration-700 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800' : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100'}`}
      style={{ transition: 'background 1s' }}>
      {/* Animated SVG Waves */}
      <div className="absolute top-0 left-0 w-full overflow-hidden -z-30" style={{ height: 120 }}>
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill={darkMode ? '#312e81' : '#a5b4fc'} fillOpacity="0.5" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden -z-30" style={{ height: 120 }}>
        <svg viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill={darkMode ? '#312e81' : '#fbcfe8'} fillOpacity="0.5" d="M0,224L60,197.3C120,171,240,117,360,101.3C480,85,600,107,720,133.3C840,160,960,192,1080,197.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </div>
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative max-w-xl mx-auto p-8 rounded-2xl shadow-2xl mt-8 overflow-hidden card-glass ${darkMode ? 'bg-white/10' : ''}`}
        style={{
          background: darkMode ? 'rgba(31,41,55,0.55)' : 'rgba(255,255,255,0.25)',
          boxShadow: darkMode ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.18)',
        }}
      >
        {/* Animated background */}
        <div 
          className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 opacity-80 blur-[2px]"
          style={{ backgroundSize: '200% 200%', animation: 'gradientMove 8s ease-in-out infinite' }}
        />
        {/* Floating particles */}
        <FloatingParticles />
        <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.98, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.img
              src={avatarPreview || defaultAvatar}
              alt="Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-primary-200 shadow-lg"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              style={{ boxShadow: '0 0 0 8px #a5b4fc55, 0 0 32px 8px #c4b5fd55' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full z-[-1]"
              animate={{
                boxShadow: [
                  '0 0 0 0px #a5b4fc55, 0 0 32px 8px #c4b5fd55',
                  '0 0 0 12px #a5b4fc33, 0 0 48px 16px #c4b5fd33',
                  '0 0 0 0px #a5b4fc55, 0 0 32px 8px #c4b5fd55'
                ]
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <motion.button
              type="button"
              className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition group-hover:scale-110"
              onClick={() => fileInputRef.current.click()}
              aria-label="Change avatar"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.95, rotate: -10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaCamera />
            </motion.button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </motion.div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
            }}
          >
            {[
              { label: <><FaUser /> Name</>, name: 'name', type: 'text', value: form.name || '', error: validation.name },
              { label: <><FaEnvelope /> Email</>, name: 'email', type: 'email', value: form.email || '', readOnly: true },
              { label: <><FaBirthdayCake /> Age</>, name: 'age', type: 'number', value: form.age || '', error: validation.age },
              { label: <><FaVenusMars /> Gender</>, name: 'gender', type: 'select', value: form.gender || '', error: validation.gender },
              { label: <><FaRulerVertical /> Height (cm)</>, name: 'height', type: 'number', value: form.height || '', error: validation.height },
              { label: <><FaWeight /> Weight (kg)</>, name: 'weight', type: 'number', value: form.weight || '', error: validation.weight },
              { label: <><FaRunning /> Activity Level</>, name: 'activityLevel', type: 'select', value: form.activityLevel || '', error: validation.activityLevel },
              { label: <><FaBullseye /> Goal</>, name: 'goal', type: 'select', value: form.goal || '', error: validation.goal }
            ].map((field, idx) => (
              <motion.div
                key={field.name}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileFocus={{ scale: 1.04, boxShadow: '0 0 0 2px #0D8ABC' }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <label className="block mb-1 font-semibold flex items-center gap-2">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    className={`input-modern w-full ${field.error ? 'border-red-400' : ''}`}
                    required={!field.readOnly}
                  >
                    <option value="">Select {field.name}</option>
                    {(field.name === 'gender' ? genders : field.name === 'activityLevel' ? activityLevels : field.name === 'goal' ? goals : []).map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <motion.input
                    type={field.type}
                    name={field.name}
                    value={field.value}
                    onChange={handleChange}
                    className={`input-modern w-full ${field.error ? 'border-red-400' : ''}`}
                    required={!field.readOnly}
                    readOnly={field.readOnly}
                    whileFocus={{ scale: 1.04, boxShadow: '0 0 0 2px #0D8ABC' }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                )}
                {field.error && <div className="text-red-500 text-xs mt-1">{field.error}</div>}
              </motion.div>
            ))}
          </motion.div>
          <motion.hr
            className="my-6 border-t-2 border-blue-200/60 w-2/3 mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.2, type: 'spring' }}
          />
          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500 text-center">
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {success && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-green-600 text-center font-semibold">
                Profile updated!
              </motion.div>
            )}
          </AnimatePresence>
          {success && (
            <ReactConfetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} />
          )}
          <motion.button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
            disabled={saving}
            whileHover={{ scale: 1.08, boxShadow: '0 0 16px 2px #a5b4fc' }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {saving ? (
              <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>Saving...</span>
            ) : (
              'Save Changes'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Profile; 