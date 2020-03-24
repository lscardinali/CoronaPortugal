import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import './SummaryPage.css';
import Summary from '../../models/summary';
import SummaryCards from './components/SummaryCards';
import { fetchSummary } from '../../services/firestore';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

const SummaryPage: React.FC = () => {

  const [summary, setSummary] = useState<Summary>();

  const [showDataToast, setShowDataToast] = useState(false);
  const [showHomeScreenToast, setShowHomeScreenToast] = useState(false);

  useEffect(() => {
    checkForFirstTime();
    checkForAddToHome();
    try {
      getSummary();
    } catch {
      getSummary();
    }
  }, [])

  const checkForFirstTime = async () => {
    const ret = await Storage.get({ key: 'firstAccess' });
    if (ret.value === null) {
      setShowDataToast(true);
    }
    await Storage.set({ key: 'firstAccess', value: 'false' })
  }

  const checkForAddToHome = async () => {
    const firstAccess = await Storage.get({ key: 'firstAccess' });
    const homeScreen = await Storage.get({ key: 'homeScreen' });
    if (firstAccess.value === 'false' && homeScreen.value === null) {
      setShowHomeScreenToast(true);
    }
    await Storage.set({ key: 'homeScreen', value: 'true' })
  }


  const getSummary = async () => {
    let summary = await fetchSummary();
    setSummary(summary);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sumário</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sumário</IonTitle>
          </IonToolbar>
        </IonHeader>
        <SummaryCards summary={summary} />
        <IonToast
          isOpen={showDataToast}
          onDidDismiss={() => setShowDataToast(false)}
          message="CoronaPT não guarda nenhuma informação pessoal e apenas usa fontes oficiais (DGS)"
          buttons={[
            {
              text: 'Ok',
              role: 'cancel',
            }
          ]}
        />
        <IonToast
          isOpen={showHomeScreenToast}
          onDidDismiss={() => setShowHomeScreenToast(false)}
          message="Estás a gostar do CoronaPT? Considere adicioná-lo á vossa Home Screen"
          buttons={[
            {
              text: 'Ok',
              role: 'cancel',
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};


export default SummaryPage;
