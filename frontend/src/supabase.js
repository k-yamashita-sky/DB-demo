import { createClient } from '@supabase/supabase-js';

/*
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default supabase;
*/

// process.env を使わずに直接書く。この書き方はセキュリティ上のリスクがあるため、実際のプロジェクトでは上のように環境変数を使用することを強くお勧めします。
// ただし、ローカルでの開発やテスト目的であれば、以下のように直接URLとキーを指定することもできます。
const supabaseUrl = 'http://localhost:54321';
const supabaseKey = 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH'; 

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;