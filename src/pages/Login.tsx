import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { logInOutline, personCircleOutline, repeatSharp } from "ionicons/icons";
import goblin from "../assets/goblin.jpg";
import Intro from "../components/Intro";
import { Preferences } from "@capacitor/preferences";
import { CardSwiper } from "./CardSwiper";

const INTRO_KEY = "intro-seen";

const Login: React.FC = () => {
  const [introSeen, setIntroSeen] = useState<boolean>(false);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === "true");
    };
    checkStorage();
  }, []);

  const router = useIonRouter();

  const doLogin = async (event: any) => {
    event.preventDefault();
    await present("Logging in...");
    setTimeout(async () => {
      dismiss();
    }, 2000);
    router.push("/app", "root");
  };

  const finishIntro = () => {
    console.log("FIN");
    setIntroSeen(true);
    Preferences.set({ key: INTRO_KEY, value: "true" });
  };

  const seeIntroAgain = () => {
    setIntroSeen(false);
    Preferences.remove({ key: INTRO_KEY });
  };

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
          <div className="bg-red-600 h-10 w-10">
            <CardSwiper />
          </div>
          <IonContent scrollY={false} className="ion-padding">
            <IonGrid fixed>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
                  <div className="ion-text-center ion-padding">
                    <img src={goblin} width={"50%"} />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow className="ion-justify-content-center">
                <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
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
                        <IonButton
                          fill="clear"
                          size="small"
                          color="medium"
                          className="ion-margin-top"
                          type="button"
                          expand="block"
                          onClick={seeIntroAgain}
                        >
                          Watch Intro Again
                          <IonIcon icon={repeatSharp} slot="end" />
                        </IonButton>
                      </form>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
            {/* <div className="ion-text-center ion-padding">
              <img src={goblin} width="50%" />
            </div> */}
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default Login;
