import React from 'react';
import Summary from '../../../models/summary';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonSkeletonText } from '@ionic/react';

interface SummaryCardProps {
    summary?: Summary;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ summary }) => {
    return (
        <div>
            <IonGrid fixed>
                <IonRow>
                    <IonCol className="ion-text-center">
                        <IonLabel><p>Informações atualizadas todos os dias as 12:00PM (Fonte: DGS)</p>
                        </IonLabel>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol ><IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="blue">
                                {summary ? summary.confirmed : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle color="blue">
                                Casos Confirmados
                </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard></IonCol>
                    <IonCol> <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="yellow">
                                {summary ? summary.suspects : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle color="yellow">
                                Casos Suspeitos
                </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="success">
                                {summary ? summary.recovered : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle color="success">
                                Recuperados
                </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard></IonCol>
                    <IonCol> <IonCard>
                        <IonCardHeader>
                            <IonCardTitle color="danger">
                                {summary ? summary.deaths : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle color="danger">
                                Mortes
                        </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><h2>Acompanhamento</h2></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {summary ? summary.waitingResults : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                Aguardando Resultado
                </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard></IonCol>
                    <IonCol> <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {summary ? summary.onWatch : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                Em Vigilância
                        </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><h2>Internamento</h2></IonCol>
                </IonRow>
                <IonRow>
                    <IonCol><IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {summary ? summary.interned : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                Casos Internados
                </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard></IonCol>
                    <IonCol> <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                {summary ? summary.internedOnIcu : <IonSkeletonText animated />}
                            </IonCardTitle>
                            <IonCardSubtitle>
                                Casos Internados UCI
                        </IonCardSubtitle>
                        </IonCardHeader>
                    </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default SummaryCards;