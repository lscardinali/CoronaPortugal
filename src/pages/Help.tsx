import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonLabel, IonItem } from '@ionic/react';

const Help: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ajuda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Ajuda</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Sintomas</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            Os seguintes sintomas podem ser indicativos do COVID-19
            <IonList>
              <IonItem>
                <IonLabel>
                  Tosse
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Febre
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Falta de Ar
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Cefaléia
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Como se prevenir?</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            A prevenção é a melhor contribuição que podemos fazer a todos
            <IonList>
              <IonItem>
                <IonLabel>
                  Lavar as mãos sempre que possível
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Utilizar Alcóol em Gel apenas quando não for possível lavar as mãos
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Falta de Ar
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  Cefaléia
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Help;
