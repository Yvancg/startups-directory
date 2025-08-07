import { useState, useEffect } from 'react';
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

export default function StartupForm({ onCreated, onCancel, startup }) {
  const [form, setForm] = useState(startup ? { ...BLANK_FORM, ...startup } : BLANK_FORM);
  const [error, setError] = useState('');
  const isEdit = Boolean(startup);

  useEffect(() => {
    setForm(startup ? { ...BLANK_FORM, ...startup } : BLANK_FORM);
  }, [startup]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (isEdit) {
      // Update existing
      const { error } = await supabase
        .from('startups')
        .update({ ...form })
        .eq('id', startup.id);
      if (error) {
        setError(error.message);
        return;
      }
    } else {
      // Create new
      const insertData = { ...form, status: 'pending' };
      const { error } = await supabase.from('startups').insert([insertData]);
      if (error) {
        setError(error.message);
        return;
      }
    }
    setForm(BLANK_FORM);
    if (onCreated) onCreated();
    if (onCancel) onCancel();
  }

  return (
    <form className="mb-6 p-6 bg-white rounded-2xl shadow" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="team_size" value={form.team_size} onChange={handleChange} placeholder="Team Size" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="business_model_type" value={form.business_model_type} onChange={handleChange} placeholder="Business Model Type" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="founded_date" value={form.founded_date} onChange={handleChange} placeholder="Founded Date" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="industries" value={form.industries} onChange={handleChange} placeholder="Industries (comma-separated)" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="legal_name" value={form.legal_name} onChange={handleChange} placeholder="Legal Name" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Contact Email" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="social_media" value={form.social_media} onChange={handleChange} placeholder="Social Media URL" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400 w-full" />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded px-4 py-2 shadow"
        >
          {isEdit ? 'Update' : 'Submit'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded px-4 py-2 shadow"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}