import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import ReactGA from 'react-ga';
import './../Common.css'
import { logoAppleAppstore, logoGooglePlaystore } from 'ionicons/icons';

const Help: React.FC = () => {

  useEffect(() => {
    ReactGA.pageview("Help");
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Ajuda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ajuda</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid fixed>
          <IonRow>
            <IonCol>
              <IonCard>
                <img src="assets/stayaway.jpg" alt="Imagem do App Stayaway Covid" />
                <IonCardHeader>
                  <IonCardTitle>STAYAWAY COVID</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Descarregue a App STAYWAY COVID e ajude a mapear a situação do COVID em Portugal e seja avisado se foi exposto à pessoas com COVID.
                  <IonGrid class="ion-no-padding ion-padding-top">
                    <IonRow>
                      <IonCol>
                        <IonButton color="blue" expand="block" href="https://apps.apple.com/pt/app/stayaway-covid/id1519479652?l=en" target="_blank">
                          <IonIcon icon={logoAppleAppstore} slot="start"></IonIcon> App Store
                        </IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton color="success" expand="block" href="https://play.google.com/store/apps/details?id=fct.inesctec.stayaway" target="_blank">
                          <IonIcon icon={logoGooglePlaystore} slot="start"></IonIcon>Play Store
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><a href="tel:808242424" style={{ textDecoration: "none" }}>808 24 24 24</a></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Se estiver com sintomas e para tirar dúvidas específicas, ligue ao SNS 24
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle><a href="tel:220411190" style={{ textDecoration: "none" }}>220 411 190</a></IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  Se tiver sintomas e estiver no norte de Portugal, ligue para linha da Administração Regional de Saúde
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Help;
