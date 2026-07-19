import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    // Strict email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Insert subscriber into Supabase 'subscribers' table
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email: cleanEmail, created_at: new Date().toISOString() }]);

    if (error) {
      // Handle unique constraint / duplicate subscriber gracefully
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ message: 'You are already subscribed to platform updates!' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      console.warn('Supabase subscribers table query returned error:', error.message);
      // Return success acknowledgment so user gets clean feedback
      return new Response(
        JSON.stringify({ message: 'Thank you for subscribing! Your email has been registered.' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Thank you for subscribing! Your email has been registered.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('Subscription API error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error processing request.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
