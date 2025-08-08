require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const users = [
  {
    email: process.env.TEST_ADMIN_EMAIL,
    password: process.env.TEST_ADMIN_PASSWORD,
    role: 'admin'
  },
  {
    email: process.env.TEST_STARTUP_EMAIL,
    password: process.env.TEST_STARTUP_PASSWORD,
    role: 'startup'
  },
  {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
    role: 'user'
  }
];

async function main() {
  for (const user of users) {
    // 1. Create user in Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
    });
    if (error) {
      console.error(`Failed to create ${user.email}:`, error.message);
      continue;
    }
    // 2. Insert into users table (with role)
    const userId = data.user.id;
    const { error: dbError } = await supabase.from('users').insert([{
      id: userId,
      email: user.email,
      name: user.email.split('@')[0],
      role: user.role,
      auth_provider: 'email'
    }]);
    if (dbError) {
      console.error(`DB error for ${user.email}:`, dbError.message);
    } else {
      console.log(`Added user: ${user.email}`);
    }
  }
}

main().catch(console.error);