'use client';

import { useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/nextjs';
import { collection, deleteField, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import db  from '../../../firebase'; // Adjust the import based on your project structure

const UserDataPage = () => {
    const { user } = useUser();
    const { getToken } = useAuth();
    const userId = user?.id;
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');
    const [userData, setUserData] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const authenticateAndFetchData = async () => {
            if (userId) {
                try {
                    const firebaseToken = await getToken({ template: "integration_firebase" });
                    if (!firebaseToken) {
                        throw new Error("No Firebase token available");
                    }

                    const auth = getAuth();
                    await signInWithCustomToken(auth, firebaseToken);

                    const userDocRef = doc(collection(db, 'userdata'), userId);

                    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
                        if (snapshot.exists()) {
                            setUserData(snapshot.data());
                        } else {
                            setUserData({});
                        }
                    });

                    return () => unsubscribe();
                } catch (err) {
                    setError(err.message);
                    console.error("Error during authentication or fetching data:", err);
                }
            }
        };

        authenticateAndFetchData();
    }, [userId, getToken]);

    const addData = async () => {
        if (userId && fieldName && fieldValue) {
            const userDocRef = doc(collection(db, 'userdata'), userId);

            try {
                await setDoc(userDocRef, { [fieldName]: fieldValue }, { merge: true });
                console.log('Data added successfully');
                setFieldName('');
                setFieldValue('');
            } catch (error) {
                setError(error.message);
                console.error('Error adding data:', error);
            }
        }
    };

    const removeData = async (fieldName) => {
        if (userId && fieldName) {
            const userDocRef = doc(collection(db, 'userdata'), userId);

            try {
                await setDoc(userDocRef, { [fieldName]: deleteField() }, { merge: true });
                console.log('Data removed successfully');
            } catch (error) {
                setError(error.message);
                console.error('Error removing data:', error);
            }
        }
    };

    return (
        <div>
            <h1>User Data</h1>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <form onSubmit={(e) => { e.preventDefault(); addData(); }}>
                <input
                    className="text-emerald-500"
                    type="text"
                    placeholder="Field Name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <br />
                <input
                    className="text-emerald-500"
                    type="text"
                    placeholder="Field Value"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                />
                <br />
                <button type="submit">Add Field</button>
            </form>
            <br />
            <table>
                <thead className="text-3xl border-emerald-500">
                <tr>
                    <th className="border-2 border-emerald-500">Field Name</th>
                    <th className="border-2 border-emerald-500">Field Value</th>
                    <th className="border-2 border-emerald-500">Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(userData).map(([fieldName, fieldValue]) => (
                    <tr key={fieldName}>
                        <td>{fieldName}</td>
                        <td>{fieldValue}</td>
                        <td>
                            <button onClick={() => removeData(fieldName)}>Remove</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDataPage;
