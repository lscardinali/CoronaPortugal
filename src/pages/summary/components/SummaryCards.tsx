import React from 'react';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonSkeletonText, IonSpinner } from '@ionic/react';
import moment from 'moment';
import { Reading } from '../../../models/reading';

interface SummaryCardProps {
    reading?: Reading;
    updating: boolean;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ reading, updating }) => {

    const summaryCard = (title: string, value: number | null | undefined, color = "") => (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle color={color}>
                    {value ? value.toLocaleString() : <IonSkeletonText animated />}
                </IonCardTitle>
                <IonCardSubtitle color={color}>
                    {title}
                </IonCardSubtitle>
            </IonCardHeader>
        </IonCard>
    );

    return (
        <div>
            <IonGrid fixed className="ion-padding" >
                <IonRow>
                    <IonCol>
                        <h4>Totais</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Confirmados', reading?.confirmed, 'blue')}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Suspeitos', reading?.suspect, 'yellow')}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Recuperados', reading?.recovered, 'success')}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Mortes', reading?.deaths, 'danger')}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h4>Acompanhamento</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Aguardando', reading?.waitingLabResults)}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Em Vigilância', reading?.onWatchCase)}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h4>Internamento</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Internados', reading?.internedCases)}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Internados UCI', reading?.uciInternedCases)}
                    </IonCol>
                    <IonRow>
                        <IonCol className="ion-text-center">
                            {updating ? <IonLabel ><IonSpinner name="dots" color="primary"> </IonSpinner><p>Atualizando dados...</p></IonLabel> :
                                <IonLabel><p>Ultima Atualização {moment(reading?.editDate).format('DD/MM/YYYY h:mm:ss a')} (Fonte: DGS)</p>
                                </IonLabel>
                            }
                        </IonCol>
                    </IonRow>
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default SummaryCards;