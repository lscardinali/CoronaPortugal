import firebase from './firebase';
import Summary from '../models/summary';
import Reading from '../models/reading';
import NewCase from '../models/newCase';

const db = firebase.firestore();

export const fetchSummary = async () => {
    const snapshot = await db.collection('summary').get();
    const data = snapshot.docs[0].data();
    return {
        confirmed: data['confirmed'],
        deaths: data['deaths'],
        interned: data['interned'],
        internedOnIcu: data['internedOnIcu'],
        onWatch: data['onWatch'],
        recovered: data['recovered'],
        suspects: data['suspects'],
        waitingResults: data['waitingResults'],
    } as Summary
}

export const fetchHistory = async () => {
    const snapshot = await db.collection('readings').orderBy("date").get()
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data['date'].seconds * 1000;
        return {
            confirmed: data['confirmed'],
            suspect: data['suspect'],
            date: date,
        } as Reading
    });
}

export const fetchNewCases = async () => {
    const snapshot = await db.collection('newCases').orderBy("date").get()
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        const date = data['date'].seconds * 1000;
        return {
            value: data['value'],
            date: date,
        } as NewCase
    });
}

