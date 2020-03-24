import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './SummaryPage.css';
import Summary from '../../models/summary';
import SummaryCards from './components/SummaryCards';
import { fetchSummary } from '../../services/firestore';

const SummaryPage: React.FC = () => {

  const [summary, setSummary] = useState<Summary>();

  useEffect(() => {

    try {
      getSummary();
    } catch {
      getSummary();
    }
  }, [])


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

      </IonContent>
    </IonPage>
  );
};

export default SummaryPage;
