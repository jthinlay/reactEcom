import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVam477Q3nroM_2JgvXGkb_hTFiVdTyIU",
    authDomain: "crwn-db-e42e2.firebaseapp.com",
    databaseURL: "https://crwn-db-e42e2.firebaseio.com",
    projectId: "crwn-db-e42e2",
    storageBucket: "crwn-db-e42e2.appspot.com",
    messagingSenderId: "304311040079",
    appId: "1:304311040079:web:d58bc9feeaf9da9a80123a",
    measurementId: "G-NKBC45GC5K"
};

export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
            console.log(createdAt);
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

export const addCollectionAndDocuments =  async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}


export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    })

 return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection; 
      return accumulator; 
  } , {})
}

firebase.initializeApp(config)

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


