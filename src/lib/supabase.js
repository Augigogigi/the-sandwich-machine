import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pxyhaboyjnumrhnkuezn.supabase.co";
const supabaseAnonkey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4eWhhYm95am51bXJobmt1ZXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY3NzE5NzksImV4cCI6MTk4MjM0Nzk3OX0.jk-o3M5aQlpLGMclymbpFTAeUIeilYv0u8EnSSGto0o";

const supabase = createClient(
	supabaseUrl,
	supabaseAnonkey,
	{
		"auth": {
			persistSession: true,
			autoRefreshToken: true,
		}
	}
);

export { supabase };