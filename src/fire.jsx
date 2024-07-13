import React, { useEffect, useState } from 'react';
import { auth, firestore } from './Firebase'; // Assuming you have exported auth and firestore from Firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore'; // Import necessary Firestore functions

export const Fire = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userUid = user.uid;
          const randomCollectionRef = collection(firestore, 'users', userUid, 'random'); // Reference to 'random' subcollection

          // Query documents in 'random' subcollection
          const q = query(randomCollectionRef);
          const querySnapshot = await getDocs(q);

          const docsData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          setDocuments(docsData);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching documents from "random" subcollection:', error);
          setLoading(false);
        }
      } else {
        console.log('No user signed in.');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Documents in "random" Subcollection</h2>
      {documents.length > 0 ? (
        <ul>
          {documents.map((doc, index) => (
            <li key={index}>{JSON.stringify(doc)}</li>
          ))}
        </ul>
      ) : (
        <p>No documents found in "random" subcollection.</p>
      )}
    </div>
  );
};
