import {
  IonButton,
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
import React, { useState } from "react";
import { logInOutline, personCircleOutline } from "ionicons/icons";
import goblin from "../assets/goblin.jpg";
import Intro from "../components/Intro";

const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState<boolean>(false);

  const router = useIonRouter();

  const doLogin = (event: any) => {
    event.preventDefault();
    console.log("doLogin");
  };

  const finishIntro = () => {};

  return (
    <>
      {!introSeen && <Intro onFinish={finishIntro} />}
      {introSeen && (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent scrollY={false}>
            <div className="ion-text-center ion-padding">
              <img src={goblin} width="50%" />
            </div>
            <IonCard>
              <IonCardContent>
                <form onSubmit={doLogin}>
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
                    className="ion-margin-top"
                    type="submit"
                    expand="block"
                  >
                    Login
                    <IonIcon icon={logInOutline} slot="end" />
                  </IonButton>
                  <IonButton
                    routerLink="/register"
                    color="secondary"
                    className="ion-margin-top"
                    type="button"
                    expand="block"
                  >
                    Create Account
                    <IonIcon icon={personCircleOutline} slot="end" />
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
