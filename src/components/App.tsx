import { IonApp, IonPage } from "@ionic/react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import { setupIonicReact } from "@ionic/react";

import { Home } from "../pages/Home";
import { Footer } from "./Footer";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

setupIonicReact();

export function App() {
  return (
    <IonApp>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-margin-horizontal">trackrrr</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Home />
        <Footer />
      </IonPage>
    </IonApp>
  );
}
