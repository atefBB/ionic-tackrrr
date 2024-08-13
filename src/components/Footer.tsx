import { IonFooter, IonTitle, IonToolbar } from "@ionic/react";

import "../styles/Footer.scss";

export function Footer() {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle>
          &copy; {new Date().getFullYear()} by{" "}
          <a href="https://github.com/atefBB">Atef Ben Ali</a>.
        </IonTitle>
      </IonToolbar>
    </IonFooter>
  );
}
