-- SECURITY DEFINER functions receive EXECUTE for PUBLIC by default in
-- PostgreSQL. Keep trigger-only helpers private and expose only the two
-- authenticated RPCs required by the browser.

revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.require_confirmed_email_for_public_profile() from public, anon, authenticated;

revoke execute on function public.record_swipe(uuid, text) from public, anon;
revoke execute on function public.toggle_post_like(uuid) from public, anon;

grant execute on function public.record_swipe(uuid, text) to authenticated;
grant execute on function public.toggle_post_like(uuid) to authenticated;
