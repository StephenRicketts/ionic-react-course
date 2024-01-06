import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { checkmarkDoneOutline } from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const router = useIonRouter();
  const doRegister = (event: any) => {
    event.preventDefault();
    console.log("doRegister");
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonCard>
          <IonCardContent>
            <form onSubmit={doRegister}>
              <IonInput
                fill="outline"
                labelPlacement="floating"
                label="Email"
                type="email"
                placeholder="someone@somewhere.com"
              />
              <IonInput
                className="ion-margin-top"
                fill="outline"
                labelPlacement="floating"
                label="Password"
                type="password"
                placeholder="password"
              />

              <IonButton
                routerLink="/register"
                color="secondary"
                className="ion-margin-top"
                type="button"
                expand="block"
              >
                Create Account
                <IonIcon icon={checkmarkDoneOutline} slot="end" />
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
