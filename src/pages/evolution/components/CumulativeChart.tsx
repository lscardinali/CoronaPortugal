import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Legend, Tooltip, LineChart, Line } from 'recharts';
import moment from 'moment';
import { fetchReadings, fetchCachedReadings } from '../../../services/network';
import { IonSpinner, IonLabel, IonButton, IonItem, IonToggle, IonRange } from '@ionic/react';
import './center.css';
import { Reading } from '../../../models/reading';

// FIXME: Refactor both screens and data to only one with different charts
const CumulativeChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [dateLowerRange, setDateLowerRange] = useState<number>(0);
    const [dateUpperRange, setDateUpperRange] = useState<number>(0);
    const [readings, setReadings] = useState<Reading[]>([])
    const [showSuspect, setShowSuspect] = useState<boolean>(true)
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
        <div style={{ width: "100%", height: "70%" }}>
            <IonItem lines="none">
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
            <div className="ion-padding" />
            <ResponsiveContainer>
                <LineChart
                    data={readings.slice(dateLowerRange, dateUpperRange + 1)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis
                        dataKey="date"
                        type="number"
                        tickFormatter={time => moment(time).format('DD/MM')}
                        tickCount={30}
                        domain={['dataMin', 'dataMax']} />
                    <YAxis />
                    <Legend
                        verticalAlign="top"
                        height={36} />
                    <Tooltip
                        labelFormatter={time => moment(time).format('DD/MM')}
                        labelStyle={{ color: darkMode ? "white" : "black" }}
                        contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                    {showSuspect && <Line
                        name="Suspeitos"
                        type="monotone"
                        dataKey="suspect"
                        stroke="#f1c40f"
                        fill="#f1c40f" />}
                    <Line
                        name="Confirmados"
                        type="monotone"
                        dataKey="confirmed"
                        stroke="#ff4961"
                        fill="#ff4961" />
                </LineChart>
            </ResponsiveContainer>
            <IonItem style={{ paddingTop: 16 }} color="black" lines="none">
                <IonLabel>Mostrar casos suspeitos</IonLabel>
                <IonToggle checked={showSuspect} onIonChange={e => setShowSuspect(e.detail.checked)} />
            </IonItem>
        </div>
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