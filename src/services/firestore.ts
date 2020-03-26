import firebase from './firebase';

const db = firebase.firestore();
// FIXME: Remove Firestore from the project 
export const updateUniqueHits = async () => {
    const snapshot = await db.collection('analytics').get()
    db.collection('analytics').doc('data').set({
        firstOpen: snapshot.docs[0].data()["firstOpen"] + 1
    }, { merge: true });
}