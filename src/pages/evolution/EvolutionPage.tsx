import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import CumulativeChart from './components/CumulativeChart';
import ProgressiveChart from './components/ProgressiveChart';
import ReactGA from 'react-ga';

import '../summary/SummaryPage.css';

const EvolutionPage: React.FC = () => {

    useEffect(() => {
        ReactGA.pageview("Evolution");
    }, []);

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const tabs = ['cumulative', 'newCases'];

    return (
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar>
                    <IonTitle>Evolução</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>

                <IonHeader collapse="condense" translucent={true}>
                    <IonToolbar>
                        <IonTitle size="large">Evolução</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="segment-margin">
                    <IonSegment onIonChange={e => e.detail.value && setSelectedTab(tabs.indexOf(e.detail.value))} value={tabs[selectedTab]}>
                        <IonSegmentButton value="cumulative">
                            <IonLabel>Cumulativo</IonLabel>
                        </IonSegmentButton>
                        <IonSegmentButton value="newCases">
                            <IonLabel>Novos Casos</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>
                </div>
                {selectedTab === 0 ? <CumulativeChart /> : <ProgressiveChart />}
            </IonContent>
        </IonPage>
    );
};

export default EvolutionPage;
