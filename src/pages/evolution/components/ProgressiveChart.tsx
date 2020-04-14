import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import moment from 'moment';
import { fetchReadings, fetchCachedReadings } from '../../../services/network';
import { IonSpinner, IonLabel, IonButton, IonRange, IonItem } from '@ionic/react';
import './center.css';
import { Reading } from '../../../models/reading';

// FIXME: Refactor both screens and data to only one with different charts
const ProgressiveChart: React.FC = () => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [dateLowerRange, setDateLowerRange] = useState<number>(0);
    const [dateUpperRange, setDateUpperRange] = useState<number>(0);
    const [readings, setReadings] = useState<Reading[]>([])
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
            console.log(readings);
            setReadings(readings);
            setDateUpperRange(readings.length - 1)

        } catch (error) {
            console.log(error);
            setShowError(true);
        }
        setShowLoading(false);

    };

    useEffect(() => {
        getReadings();
    }, [])
    const chart = (
        <div style={{ width: "100%", height: "70%" }}>
            <ResponsiveContainer>
                <BarChart
                    data={readings.slice(dateLowerRange, dateUpperRange + 1)}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis
                        scale="log"
                        dataKey="date"
                        tickFormatter={time => moment(time).format('DD/MM')}
                        domain={['dataMin', 'dataMax']} />
                    <YAxis />
                    <Tooltip
                        labelFormatter={time => moment(time).format('DD/MM')}
                        labelStyle={{ color: darkMode ? "white" : "black" }}
                        contentStyle={darkMode ? { backgroundColor: "#111111", borderColor: "#222222" } : undefined} />
                    <Bar name="Confirmados"
                        dataKey="newCases"
                        fill="#3880ff" />
                </BarChart>
            </ResponsiveContainer>
            <IonItem lines="none" style={{ paddingTop: 16 }}>
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

export default ProgressiveChart;