import React from 'react';
import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard, IonGrid, IonRow, IonCol, IonLabel, IonSpinner } from '@ionic/react';
import moment from 'moment';
import { Reading } from '../../../models/reading';

interface SummaryCardProps {
    reading?: Reading;
    updating: boolean;
}

const SummaryCards: React.FC<SummaryCardProps> = ({ reading, updating }) => {

    const summaryCard = (title: string,
        value: string | number | null | undefined,
        newValue: string | number | null | undefined,
        color = "",
        isPercent = false) => (
            <IonCard>
                <IonCardHeader mode="ios">
                    <IonCardTitle color={color}>
                        {value && (isPercent ? value.toLocaleString() + ' %' : value.toLocaleString())}
                        <p style={{ marginBlockStart: "0.2em", fontSize: 12 }}>{newValue && '+' + newValue.toLocaleString()}</p>
                    </IonCardTitle>
                    <IonCardSubtitle color={color} mode="ios">
                        {title}
                    </IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
        );

    return (
        <IonGrid fixed className="ion-padding" >
            <IonRow>
                <IonCol className="ion-text-center">
                    {updating ?
                        <IonLabel>
                            <IonSpinner name="dots" color="primary" />
                            <p>Atualizando dados...</p>
                        </IonLabel>
                        : <IonLabel>
                            <p>Atualizado em {moment(reading?.editDate).format('DD/MM/YYYY h:mm:ss a')} (Fonte: DGS)</p>
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
                    {summaryCard('Activos', reading?.active, reading?.newActive, 'yellow')}
                </IonCol>
                <IonCol>
                    {summaryCard('Confirmados', reading?.confirmed, reading?.newConfirmed, 'blue')}
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    {summaryCard('Recuperados', reading?.recovered, reading?.newRecovered, 'success')}
                </IonCol>
                <IonCol>
                    {summaryCard('Mortes', reading?.deaths, reading?.newDeaths, 'danger')}
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <h4>Acompanhamento</h4>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    {summaryCard('Letalidade', reading?.letality, undefined, "", true)}
                </IonCol>
                <IonCol>
                    {summaryCard('Em vigilância', reading?.onWatchCase, undefined)}
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <h4>Internamento</h4>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    {summaryCard('Internados', reading?.internedCases, undefined)}
                </IonCol>
                <IonCol>
                    {summaryCard('Internados UCI', reading?.uciInternedCases, undefined)}
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default SummaryCards;