import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import StartupForm from './StartupForm';

export default function AdminStartupCRUD() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editStartup, setEditStartup] = useState(null);

  useEffect(() => {
    fetchStartups();
  }, []);

  async function fetchStartups() {
    setLoading(true);
    const { data, error } = await supabase.from('startups').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setStartups(data);
    setLoading(false);
  }

  function handleCreated() {
    fetchStartups();
    setShowForm(false);
    setEditStartup(null);
  }

  function handleEdit(startup) {
    setEditStartup(startup);
    setShowForm(true);
  }

  async function handleDelete(startup) {
    if (!window.confirm(`Delete "${startup.name}"?`)) return;
    const { error } = await supabase.from('startups').delete().eq('id', startup.id);
    if (error) alert(error.message);
    fetchStartups();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-blue-700">All Startups</h2>
        <button
          onClick={() => { setShowForm(true); setEditStartup(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-5 py-2 shadow transition"
        >
          + Add New Startup
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <StartupForm
            startup={editStartup}
            onCreated={handleCreated}
            onCancel={() => { setShowForm(false); setEditStartup(null); }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : startups.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">No startups yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow rounded-2xl p-6 flex flex-col gap-3 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-800">{s.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${s.status === 'approved' ? 'bg-green-100 text-green-700' : s.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
              </div>
              <div className="text-gray-700">{s.description || <span className="italic text-gray-400">No description.</span>}</div>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {s.industries?.split(',').map(ind => <span key={ind} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{ind.trim()}</span>)}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-3 py-1 font-semibold"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 font-semibold"
                  onClick={() => handleDelete(s)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Note: This component is for admin users to manage startups. It allows adding, editing, and deleting startups.
// Ensure you have the necessary permissions set up in your Supabase project to allow admin access to the startups table.
// The `StartupForm` component is used for both creating and editing startups, depending on whether the `startup` prop is provided.
// The `status` field is used to indicate the approval status of the startup, which can be 'pending', 'approved', or 'rejected'.
// The component fetches all startups from the Supabase database and displays them in a grid layout with options to edit or delete each startup.
// The `handleCreated` function is called after a startup is created or updated, refreshing the list of startups and closing the form.
// The `handleEdit` function sets the selected startup for editing and opens the form.
// The `handleDelete` function prompts for confirmation before deleting a startup and refreshes the list afterward.
// The component uses Tailwind CSS for styling, providing a clean and responsive design.
// Make sure to import this component in your main application file (e.g., `App.jsx`) and conditionally render it based on the user's role (e.g., `userRole === 'admin'`).
// You can customize the styles and layout further to match your application's design preferences.
// Ensure you have the necessary environment variables set up for Supabase in your project (e.g., `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
// You can also add additional features like pagination, search, or filtering based on your requirements.
// This component assumes you have a Supabase table named `startups` with the necessary fields defined in your database schema.
// The `StartupForm` component should handle the form submission logic, including validation and error handling.
// You can enhance the user experience by adding loading indicators, success messages, and error handling for API requests.
// Consider implementing role-based access control to restrict this component to admin users only.
// You can also add additional fields to the `startups` table and update the form accordingly.
// If you want to implement more advanced features like file uploads for logos or images, consider using Supabase Storage or another file storage solution.
// Make sure to test the component thoroughly to ensure it works as expected in different scenarios (e.g., creating, editing, deleting startups).
// You can also add unit tests or integration tests to ensure the component behaves correctly and handles edge cases.
// Consider adding analytics or logging to track user interactions with the CRUD operations, such as how many startups are created, edited, or deleted over time.
// You can also implement notifications or alerts to inform users about successful operations or errors during CRUD actions.
// If you want to enhance the user interface, consider using a UI library like Material-UI or Ant Design for more advanced components and styles.
// You can also implement responsive design techniques to ensure the component looks good on different screen sizes and devices.
// Consider adding accessibility features to ensure the component   is usable by all users, including those with disabilities.
// You can also implement internationalization (i18n) to support multiple languages if your application targets a global audience.
// Finally, make sure to keep your dependencies up to date and follow best practices for React development, including code organization, state management, and performance optimization.
// Regularly review and refactor your code to maintain readability and maintainability as your application grows.
// You can also consider implementing a CI/CD pipeline to automate testing and deployment of your application, ensuring that changes are deployed smoothly and reliably.
// This component can serve as a foundation for building a more comprehensive admin dashboard for managing startups, including features like user management, analytics, and reporting.
// You can also integrate third-party services or APIs to enhance the functionality of your admin dashboard, such as integrating with marketing tools, CRM systems, or analytics platforms.
// Consider implementing security best practices, such as input validation, sanitization, and protection against common vulnerabilities like SQL injection and cross-site scripting (XSS).
// You can also implement logging and monitoring to track user actions and system performance, helping you identify and resolve issues quickly.
// Additionally, consider implementing a backup and recovery strategy for your Supabase database to ensure data integrity and availability in case of unexpected issues or data loss.
// You can also explore advanced features like real-time updates using Supabase's real-time capabilities, allowing users to see changes in the startup list without refreshing the page.
// This can enhance the user experience and make the admin dashboard more interactive and responsive to changes in the data.
// You can also consider implementing role-based access control (RBAC) to restrict certain actions or views based on user roles, ensuring that only authorized users can perform sensitive operations like deleting startups or modifying their details.
// This can help maintain data integrity and security within your application, especially as it grows and more users interact with the admin dashboard.
// Finally, consider gathering user feedback on the admin dashboard to identify areas for improvement and new features that could enhance the user experience and functionality of the startup management system.
// Regularly update your application based on user feedback and evolving requirements, ensuring that it remains relevant and useful for managing startups effectively.
// You can also consider implementing a feature to archive startups instead of deleting them, allowing you to retain historical data while keeping the active list clean and focused on current startups.
// This can be particularly useful for maintaining a record of past startups and their details, which can be valuable for analytics or reporting purposes.
// Additionally, you can implement a search or filter functionality to help users quickly find specific startups based on criteria like name, industry, or status.
// This can enhance the usability of the admin dashboard, especially as the number of startups grows over time.
// You can also consider implementing bulk actions, such as bulk deleting or updating multiple startups at once, to streamline administrative tasks and improve efficiency for users managing large numbers of startups.
// This can be particularly useful for scenarios where multiple startups need to be updated or removed simultaneously,
// reducing the need for repetitive actions and improving the overall user experience.
// Finally, consider implementing a user-friendly onboarding process for new admin users, including tutorials or documentation
// to help them understand how to use the admin dashboard effectively.
// This can help new users get up to speed quickly and ensure they can manage startups efficiently from the start.
// You can also consider providing support channels, such as a help center or community forum,
// where users can ask questions, share feedback, and get assistance with using the admin dashboard.
// This can foster a sense of community and support among users, helping them feel more engaged and empowered to manage startups effectively.
// Regularly review and update your onboarding materials and support resources to ensure they remain relevant and helpful as your application evolves and new features are added.
// You can also consider implementing a feedback mechanism within the admin dashboard, allowing users to submit suggestions or report issues directly from the interface.
//// This can help you gather valuable insights into user needs and pain points, enabling you to prioritize improvements
// and new features based on real user feedback.
// Additionally, you can implement analytics to track user interactions with the admin dashboard, such as which features are most used, how often startups are created or edited, and other key metrics.
// This data can help you make informed decisions about future enhancements and optimizations, ensuring that the admin dashboard continues to meet user needs and expectations over time.
// You can also consider implementing a versioning system for startups, allowing users to view and restore previous versions of startup details.
// This can be particularly useful for tracking changes over time and providing a way to revert to earlier information if needed.
// It can also enhance transparency and accountability in managing startup data, especially in collaborative environments where multiple users may edit startup details.
// Additionally, you can explore integrating with external APIs or services to enrich the startup data, such as pulling in industry trends, market analysis, or competitor information.
// This can provide users with valuable context and insights when managing startups, helping them make more informed decisions and strategies.
// You can also consider implementing a notification system to alert users about important events or changes related to startups, such as approval status updates, new startup submissions, or upcoming deadlines for startup applications.
// This can help keep users informed and engaged with the startup management process, ensuring they don't miss important updates or actions that require their attention.
// Finally, consider implementing a user management system within the admin dashboard, allowing you to create, edit, and delete admin users,
// assign roles and permissions, and manage user access to different features of the dashboard. 