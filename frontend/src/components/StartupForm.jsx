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
  country: '',
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
    const payload = { ...form, country: form.country?.trim() || 'Thailand' };
    if (isEdit) {
      // Update existing
      const { error } = await supabase
        .from('startups')
        .update(payload)
        .eq('id', startup.id);
      if (error) {
        setError(error.message);
        return;
      }
    } else {
      // Create new
      const { error } = await supabase.from('startups').insert([{ ...payload, status: 'pending' }]);
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
    <form className="mb-6 p-6 bg-white rounded-2xl shadow border border-gray-100" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="input-pill" />
        <input name="logo" value={form.logo} onChange={handleChange} placeholder="Logo URL" className="input-pill" type="url" />
        <input name="team_size" value={form.team_size} onChange={handleChange} placeholder="Team Size" className="input-pill" />
        <input name="business_model_type" value={form.business_model_type} onChange={handleChange} placeholder="Business Model Type" className="input-pill" />
        <input name="website" value={form.website} onChange={handleChange} placeholder="Website" className="input-pill" type="url" />
        <input name="founded_date" value={form.founded_date} onChange={handleChange} placeholder="Founded Date (e.g., 2021 or Jun 25 2003)" className="input-pill" />
        <input name="industries" value={form.industries} onChange={handleChange} placeholder="Industries (comma-separated)" className="input-pill" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country (e.g., Thailand)" className="input-pill" />
        <input name="legal_name" value={form.legal_name} onChange={handleChange} placeholder="Legal Name" className="input-pill" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Contact Email" className="input-pill" type="email" />
        <input name="phone_number" value={form.phone_number} onChange={handleChange} placeholder="Phone Number" className="input-pill" type="tel" />
        <input name="social_media" value={form.social_media} onChange={handleChange} placeholder="Social Media URL" className="input-pill" type="url" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Short Description" className="input-pill" />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <div className="flex gap-3 mt-5">
        <button
          type="submit"
          className="btn-primary"
        >
          {isEdit ? 'Update' : 'Submit'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-6 h-12 font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200 shadow"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}