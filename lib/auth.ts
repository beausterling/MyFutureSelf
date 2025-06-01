import { supabase } from './supabase';

export async function syncUserWithSupabase(userId: string, email: string, firstName?: string, lastName?: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email,
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error syncing user with Supabase:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in syncUserWithSupabase:', error);
    throw error;
  }
}