import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://esyceilkedkmdkrbhrul.supabase.co";
const supabaseKey = import.meta.env.VITE_supabase_key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
