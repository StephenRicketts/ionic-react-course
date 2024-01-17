import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { addOutline, trashBinOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import "./List.css";

const List: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any[]>([]);
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const page = useRef(null);

  const [activeSegment, setActiveSegment] = useState<any>("details");

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  const getUsers = async () => {
    const data = await fetch("https://randomuser.me/api?results=10");
    const users = await data.json();
    setUsers(users.results);
  };

  useIonViewWillEnter(() => {
    getUsers();
    setLoading(false);
  });

  const clearList = () => {
    showAlert({
      header: "Confirm!",
      message: "Are you sure you want to delete all users?",
      buttons: [
        { text: "Cancel", role: "cancel" },
        {
          text: "Delete",
          handler: () => {
            setUsers([]);
            showToast({
              message: "All users deleted",
              duration: 2000,
              color: "danger",
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (event: any) => {
    getUsers();
    event.detail.complete();
  };

  return (
    <IonPage ref={page}>
      <IonHeader>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
                color={"light"}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color="secondary">
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={(evt) => doRefresh(evt)}>
          <IonRefresherContent />
        </IonRefresher>

        {loading &&
          [...Array(10)].map((_, index) => {
            return (
              <IonCard key={index}>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonSkeletonText />
                    </IonAvatar>
                    <IonLabel>
                      <IonSkeletonText animated style={{ width: "150px" }} />
                      <p>
                        <IonSkeletonText />
                      </p>
                    </IonLabel>
                    <IonChip slot="end" color={"primary"}></IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })}

        {users &&
          !loading &&
          users.map((user, index) => {
            return (
              <IonCard onClick={() => setSelectedUser(user)} key={index}>
                <IonCardContent className="ion-no-padding">
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonImg src={user.picture.large} />
                    </IonAvatar>
                    <IonLabel>
                      {user.name.first} {user.name.last}
                      <p style={{}}>{user.email}</p>
                    </IonLabel>
                    <IonChip slot="end" color={"primary"}>
                      {user.nat}
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            );
          })}

        <IonModal
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.5}
          ref={modal}
          isOpen={selectedUser !== null}
          onIonModalDidDismiss={() => {
            setSelectedUser(null);
          }}
        >
          <IonHeader>
            <IonToolbar color="light">
              <IonButtons slot="start">
                <IonButton>
                  <IonButton onClick={() => modal.current?.dismiss()}>
                    Close
                  </IonButton>
                  <IonTitle>
                    {selectedUser?.name.first} {selectedUser?.name.last}
                  </IonTitle>
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar color="light">
              <IonSegment
                value={activeSegment}
                onIonChange={(e) => setActiveSegment(e.detail.value!)}
              >
                <IonSegmentButton value="details">Details</IonSegmentButton>
                <IonSegmentButton value="calendar">Sheet</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {activeSegment === "details" && <>THESE ARE DETAILS</>}
            {activeSegment === "calendar" && <IonDatetime />}
          </IonContent>
        </IonModal>

        <IonModal
          ref={cardModal}
          trigger="card-modal"
          presentingElement={presentingElement!}
        >
          <IonCardHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => cardModal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonCardHeader>
          <IonContent>
            <p>my card modal</p>
          </IonContent>
        </IonModal>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton id="card-modal">
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default List;
