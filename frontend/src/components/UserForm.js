import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, InputLabel, FormControl, Select, Typography } from '@mui/material';

const activityLevels = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'light', label: 'Light' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'active', label: 'Active' },
  { value: 'very active', label: 'Very Active' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

function UserForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h5" mb={2}>Enter Your Details</Typography>
      <TextField
        label="Age"
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={form.gender}
          label="Gender"
          onChange={handleChange}
        >
          {genders.map((g) => (
            <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Weight (kg)"
        name="weight"
        type="number"
        value={form.weight}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Height (cm)"
        name="height"
        type="number"
        value={form.height}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Activity Level</InputLabel>
        <Select
          name="activityLevel"
          value={form.activityLevel}
          label="Activity Level"
          onChange={handleChange}
        >
          {activityLevels.map((a) => (
            <MenuItem key={a.value} value={a.value}>{a.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
        {loading ? 'Submitting...' : 'Get Meal Plan'}
      </Button>
    </Box>
  );
}

export default UserForm; 