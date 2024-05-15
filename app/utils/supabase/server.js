import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookiesStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookiesStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookiesStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name, options) {
          try {
            cookiesStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
    }
  );
}
