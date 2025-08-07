import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const BLANK_FORM = {
  name: '',
  logo: '',
  team_size: '',
  business_model_type: '',
  website: '',
  founded_date: '',
  industries: '',
  legal_name: '',
  email: '',
  phone_number: '',
  social_media: '',
  description: '',
};

export default function StartupForm({ onCreated, startup, onCancel }) {
  const [form, setForm] = useState(startup || BLANK_FORM);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (startup) {
      // Update existing record
      const { error } = await supabase
        .from('startups')
        .update(form)
        .eq('id', startup.id);
      if (error) {
        setError(error.message);
        return;
      }
    } else {
      // Insert new record with status 'pending'
      const insertData = { ...form, status: 'pending' };
      const { error } = await supabase.from('startups').insert([insertData]);
      if (error) {
        setError(error.message);
        return;
      }
      setForm(BLANK_FORM);
    }
    if (onCreated) onCreated();
    if (onCancel) onCancel();
  }

  return (
    <form className="mb-6 p-4 bg-gray-50 rounded shadow" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="p-2 border" />
        <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL" className="p-2 border" />
        <input name="team_size" value={form.team_size} onChange={handleChange} placeholder="Team Size" className="p-2 border" />
        <input name="business_model_type" value={form.business_model_type} onChange={handleChange} placeholder="Business Model Type" className="p-2 border" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="p-2 border" />
        <input name="founded_date" value={form.founded_date} onChange={handleChange} placeholder="Founded Date" className="p-2 border" />
        <input name="industries" value={form.industries} onChange={handleChange} placeholder="Industries (comma-separated)" className="p-2 border" />
        <input name="legal_name" value={form.legal_name} onChange={handleChange} placeholder="Legal Name" className="p-2 border" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Contact Email" className="p-2 border" />
        <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="p-2 border" />
        <input name="social_media" value={form.social_media} onChange={handleChange} placeholder="Social Media URL" className="p-2 border" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border" />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {startup ? 'Update' : 'Submit'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}