import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, LineChart, Line } from 'recharts';
import moment from 'moment';
import { fetchReadings, fetchCachedReadings } from '../../../services/network';
import { IonSpinner, IonLabel, IonButton, IonItem, IonToggle, IonRange, IonList } from '@ionic/react';
import '../../Common.css';
import { Reading } from '../../../models/reading';

const CumulativeChart: React.FC = () => {

    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [dateLowerRange, setDateLowerRange] = useState<number>(0);
    const [dateUpperRange, setDateUpperRange] = useState<number>(0);
    const [readings, setReadings] = useState<Reading[]>([])
    const [showRecovered, setShowRecovered] = useState<boolean>(true);
    const [showActive, setShowActive] = useState<boolean>(true);
    const [showConfirmed, setShowConfirmed] = useState<boolean>(true);
    const [showDeaths, setShowDeaths] = useState<boolean>(true);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    const getReadings = async () => {
        setShowLoading(true);
        let cachedReadings = await fetchCachedReadings();
        if (cachedReadings.length > 0) {
            setReadings(cachedReadings)
            setDateUpperRange(cachedReadings.length - 1)
            setShowLoading(false);
        }

        try {

            let readings = await fetchReadings();
            setReadings(readings);
            setShowLoading(false);
            setDateLowerRange(readings.length - 30)
            setDateUpperRange(readings.length - 1)
        } catch {

            setShowError(true);
        }
        setShowLoading(false);
    }

    useEffect(() => {
        getReadings();
    }, [])

    const chart = (
        <IonList className="rounded-list ion-margin" lines="none">
            <div style={{ width: "100%", height: 500 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={readings.slice(dateLowerRange, dateUpperRange + 1)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
                        <XAxis
                            scale="log"
                            dataKey="date"
                            type="number"
                            tickFormatter={time => moment(time).format('DD/MM')}
                            domain={['dataMin', 'dataMax']}
                        />
                        <YAxis
                            tickFormatter={number => number.toLocaleString()}
                        />
                        <Legend verticalAlign="bottom" />
                        <Tooltip
                            labelFormatter={time => moment(time).format('DD/MM')}
                            labelStyle={{ color: darkMode ? "white" : "black" }}
                            formatter={number => number.toLocaleString()}
                            contentStyle={darkMode ?
                                { backgroundColor: "#111111", borderColor: "#222222" } :
                                { backgroundColor: "#f2f2f2", borderColor: "#b0b0b0" }} />
                        {showActive &&
                            <Line
                                stroke="var(--ion-color-warning)"
                                fill="var(--ion-color-warning)"
                                name="Activos"
                                dataKey="active" />}
                        {showRecovered &&
                            <Line
                                name="Recuperados"
                                dataKey="recovered"
                                stroke="var(--ion-color-success)"
                                fill="var(--ion-color-success)" />}
                        {showConfirmed &&
                            <Line
                                name="Confirmados"
                                dataKey="confirmed"
                                stroke="var(--ion-color-blue)"
                                fill="var(--ion-color-blue)" />}
                        {showDeaths &&
                            <Line
                                name="Mortos"
                                dataKey="deaths"
                                stroke="var(--ion-color-danger)"
                                fill="var(--ion-color-danger)" />}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <IonItem lines="full">
                {readings && <IonRange
                    dualKnobs={true}
                    min={0}
                    max={readings.length - 1}
                    step={1}
                    snaps={true}
                    ticks={false}
                    value={{ lower: dateLowerRange, upper: dateUpperRange }}
                    onIonChange={e => {
                        const values = e.detail.value as { lower: number, upper: number };
                        setDateLowerRange(values.lower);
                        setDateUpperRange(values.upper)
                    }}>
                    <IonLabel slot="start">{readings && readings.length > 0 && moment(readings[dateLowerRange].date).format('DD/MM')}</IonLabel>
                    <IonLabel slot="end">{readings && readings.length > dateUpperRange && moment(readings[dateUpperRange].date).format('DD/MM')}</IonLabel>
                </IonRange>}
            </IonItem>
            <IonItem>
                <IonLabel>Activos</IonLabel>
                <IonToggle color="warning" checked={showActive} onIonChange={e => setShowActive(e.detail.checked)} />
            </IonItem>
            <IonItem>
                <IonLabel>Recuperados</IonLabel>
                <IonToggle color="success" checked={showRecovered} onIonChange={e => setShowRecovered(e.detail.checked)} />
            </IonItem>
            <IonItem>
                <IonLabel>Confirmados</IonLabel>
                <IonToggle color="blue" checked={showConfirmed} onIonChange={e => setShowConfirmed(e.detail.checked)} />
            </IonItem>
            <IonItem>
                <IonLabel>Óbitos</IonLabel>
                <IonToggle color="danger" checked={showDeaths} onIonChange={e => setShowDeaths(e.detail.checked)} />
            </IonItem>
        </IonList>
    );

    if (showError) {
        return <div className="center-container">
            <IonLabel>
                <p>Não foi possível aceder aos dados</p>
            </IonLabel>
            <IonButton
                fill="outline"
                onClick={(e) => getReadings()}>
                Tentar novamente</IonButton>
        </div>
    } else if (showLoading) {
        return <div className="center-container">
            <IonSpinner color="primary" />
        </div>
    } else {
        return chart
    }
};

export default CumulativeChart;