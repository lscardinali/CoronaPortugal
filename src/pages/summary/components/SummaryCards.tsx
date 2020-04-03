import React from 'react';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonSkeletonText, IonSpinner } from '@ionic/react';
import moment from 'moment';
import { Reading } from '../../../models/reading';

interface SummaryCardProps {
    lastReading?: Reading;
    allReadings?: Reading[];
    updating: boolean;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ lastReading, allReadings, updating }) => {

    let count = 0;
    if (allReadings && lastReading) {
        allReadings.reverse().forEach(reading => {
            if (reading.confirmed && lastReading.confirmed && (reading.confirmed >= lastReading.confirmed / 2)) {
                count++;
            }
        });
    }

    let percent = "0";
    if (allReadings) {
        let yesterday: Reading = allReadings[allReadings.length - 2];
        if (yesterday.confirmed && lastReading && lastReading.confirmed) {
            percent = (100 - ((yesterday.confirmed * 100) / lastReading.confirmed)).toFixed(2);;
        }
    }

    const summaryCard = (title: string, value: string | number | null | undefined, color = "") => (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle color={color}>
                    {value && value.toLocaleString()}
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
                    <IonCol className="ion-text-center">
                        {updating ?
                            <IonLabel>
                                <IonSpinner name="dots" color="primary" />
                                <p>Atualizando dados...</p>
                            </IonLabel>
                            : <IonLabel>
                                <p>Ultima Atualização {moment(lastReading?.editDate).format('DD/MM/YYYY h:mm:ss a')} (Fonte: DGS)</p>
                            </IonLabel>
                        }
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h4>Totais</h4>
                    </IonCol>
                </IonRow>

                <IonRow>
                    <IonCol>
                        {summaryCard('Confirmados', lastReading?.confirmed, 'blue')}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Suspeitos', lastReading?.suspect, 'yellow')}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Recuperados', lastReading?.recovered, 'success')}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Mortes', lastReading?.deaths, 'danger')}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Dobramos os casos', `${count} Dias`)}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Aumento de casos', `${percent}%`)}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h4>Acompanhamento</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {
                            summaryCard('Aguardando', lastReading?.waitingLabResults)
                        }
                    </IonCol>
                    <IonCol>
                        {summaryCard('Em vigilância', lastReading?.onWatchCase)}
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h4>Internamento</h4>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        {summaryCard('Internados', lastReading?.internedCases)}
                    </IonCol>
                    <IonCol>
                        {summaryCard('Internados UCI', lastReading?.uciInternedCases)}
                    </IonCol>
                </IonRow>
            </IonGrid>
        </div>
    );
};

export default SummaryCards;