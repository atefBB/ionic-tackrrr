import { Fragment, useState, useEffect } from "react";
import { IonApp, IonPage } from "@ionic/react";

import supabase from "../lib/supabase";

import { AuthForm } from "./AuthForm";
import { Home } from "../pages/Home";
import Header from "../components/Header";
import { Footer } from "./Footer";

// eslint-disable-next-line
import { setupIonicReact } from "@ionic/react";

//import "@ionic/react/css/core.css";

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
    <IonApp>
      <IonPage>
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
      </IonPage>
    </IonApp>
  );
}
