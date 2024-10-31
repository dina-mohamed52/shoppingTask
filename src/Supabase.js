
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://bmdvdmtbaszopphdiwot.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtZHZkbXRiYXN6b3BwaGRpd290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1OTYxNDQsImV4cCI6MjA0MDE3MjE0NH0.3boDnCUoSk4tIAhJkjbY_KbAHrZHRx-8hXzHQQJ5Pq8'
export const supabase = createClient(supabaseUrl, supabaseKey)