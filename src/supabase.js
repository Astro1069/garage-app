import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqczvworwgxvvvopjwlx.supabase.co";
const supabaseKey = "sb_publishable_LxpUHnSLoL3owUfmXMaFPA_LQdbQmmU";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);