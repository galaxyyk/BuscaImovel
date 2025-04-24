import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzrkgpzfsxbeoszhxdpm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6cmtncHpmc3hiZW9zemh4ZHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MDE4MzcsImV4cCI6MjA2MDQ3NzgzN30.A8eOD796T8tMyq0otnAwwPdDRQStSVQV7uS3SAldgX8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);