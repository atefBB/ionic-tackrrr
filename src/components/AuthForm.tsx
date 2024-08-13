import { useState } from "react";
import { IonButton } from "@ionic/react";

import supabase from "../lib/supabase";

import "../styles/AuthForm.scss";

export function AuthForm() {
  const [error, setError] = useState<any>(null);

  const handleLoginButtonOnClickEvent = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    setError(error);
  };

  if (error !== null) {
    return <p>It's seems there's a problem ! Please try later</p>;
  }

  return (
    <div className="auth-form">
      <h1>trackrrr</h1>
      <h2 className="mb-m">Yet another time tracking tool</h2>

      <p>Click the button to login with GitHub.</p>

      <IonButton
        fill="outline"
        className="auth-button__clz turquoise-flow"
        onClick={handleLoginButtonOnClickEvent}
      >
        Let's go!
      </IonButton>
    </div>
  );
}
