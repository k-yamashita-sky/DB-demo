import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fdbacargxsjxwijgladi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkYmFjYXJneHNqeHdpamdsYWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MzM0ODMsImV4cCI6MjA4NjQwOTQ4M30.UTN-C8aeSUVuTQ8k60ZfJeZT5e3yFDT292lcb7D7lQ4';
export const supabase = createClient(supabaseUrl, supabaseKey);
