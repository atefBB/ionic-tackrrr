import { Fragment, useState, useEffect } from "react";
import { IonApp, IonPage } from "@ionic/react";
import {
  IonMenuButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
} from "@ionic/react";

import supabase from "../lib/supabase";

import { AuthForm } from "./AuthForm";
import { Home } from "../pages/Home";
import Header from "../components/Header";
import { Footer } from "./Footer";

import { setupIonicReact } from "@ionic/react";

import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

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
      {user !== null ? <Header user={user} /> : null}
      <IonPage id="main-content">
        {user === null ? (
          <div className="container">
            <AuthForm />
          </div>
        ) : (
          <Fragment>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="end">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonTitle className="ion-margin-horizontal">trackrrr</IonTitle>
              </IonToolbar>
            </IonHeader>
            <Home user={user} />
          </Fragment>
        )}
        <Footer />
      </IonPage>
    </IonApp>
  );
}
