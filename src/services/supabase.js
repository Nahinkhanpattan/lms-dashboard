import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// Profile helpers
export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
};

// Course helpers
export const getCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select('*');
  if (error) throw error;
  return data;
};

export const createCourse = async (courseData) => {
  const { data, error } = await supabase
    .from('courses')
    .insert([courseData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Quiz helpers
export const getQuizzes = async () => {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*');
  if (error) throw error;
  return data;
};

export const createQuiz = async (quizData) => {
  const { data, error } = await supabase
    .from('quizzes')
    .insert([quizData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Discussion helpers
export const getDiscussions = async () => {
  const { data, error } = await supabase
    .from('discussions')
    .select('*');
  if (error) throw error;
  return data;
};

export const createDiscussion = async (discussionData) => {
  const { data, error } = await supabase
    .from('discussions')
    .insert([discussionData])
    .select()
    .single();
  if (error) throw error;
  return data;
};

// Notification helpers
export const getNotifications = async (userId) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const markNotificationAsRead = async (notificationId) => {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
  if (error) throw error;
};

export const deleteNotification = async (notificationId) => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);
  if (error) throw error;
};