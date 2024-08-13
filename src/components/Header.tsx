import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonButton,
  IonAvatar,
  IonMenu,
} from "@ionic/react";

import supabase from "../lib/supabase";

import "../styles/Header.scss";

const Header = ({ user }: any) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <IonMenu side="end" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton>{user.user_metadata.full_name}</IonButton>
          </IonButtons>
          <IonButtons slot="primary">
            <IonButton>
              <IonAvatar>
                <img src={user.user_metadata.avatar_url} alt="Avatar" />
              </IonAvatar>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          fill="clear"
          className="ion-float-right"
          onClick={handleLogout}
        >
          Logout
        </IonButton>
      </IonContent>
    </IonMenu>
  );
};

export default Header;
