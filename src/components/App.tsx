import { Fragment, useState, useEffect } from "react";

import supabase from "../lib/supabase";

import { AuthForm } from "./AuthForm";
import { Home } from "../pages/Home";
import Header from "../components/Header";
import { Footer } from "./Footer";

export function App() {
  const [user, setUser] = useState<any>(null);

  const [, setLogin] = useState(false);

  supabase.auth.onAuthStateChange((event) => {
    setLogin(event === "SIGNED_IN");
  });

  useEffect(() => {
    async function getSupabaseUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    }

    getSupabaseUser();
  }, []);

  return (
    <main>
      {user === null ? (
        <div className="container">
          <AuthForm />
        </div>
      ) : (
        <Fragment>
          <Header user={user} />
          <Home user={user} />
        </Fragment>
      )}
      <Footer />
    </main>
  );
}
