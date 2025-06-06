// utils/supabase.js
import { createClient } from '@supabase/supabase-js';

// Pega as variáveis de ambiente que configuramos no Netlify
const SUPABASE_URL = process.env.SUPABASE_DATABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Cria e exporta o cliente do Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);