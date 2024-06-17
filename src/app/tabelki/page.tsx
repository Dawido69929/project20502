'use client';

import {useEffect, useState} from 'react';
import {useUser} from '@clerk/nextjs';
import {collection, deleteField, doc, getFirestore, onSnapshot, setDoc} from 'firebase/firestore';
import app from '../../middleware';
const db = getFirestore(app);
const UserDataPage = () => {
    const { user } = useUser();
    const userId = user?.id;
    const [fieldName, setFieldName] = useState('');
    const [fieldValue, setFieldValue] = useState('');
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchUserData = () => {
            if (userId) {
                const userDataRef = collection(db, 'userdata');
                const userDocRef = doc(userDataRef, userId);

                return onSnapshot(userDocRef, (snapshot) => {
                    if (snapshot.exists()) {
                        setUserData(snapshot.data() as Record<string, unknown>);
                    } else {
                        setUserData({});
                    }
                });
            }
        };

        const unsubscribe = fetchUserData();
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [userId]);

    // Function to add data to the user's collection
    const addData = async () => {
        if (userId && fieldName && fieldValue) {
            const userDataRef = collection(db, 'userdata');
            const userDocRef = doc(userDataRef, userId);

            try {
                await setDoc(userDocRef, { [fieldName]: fieldValue }, { merge: true });
                console.log('Data added successfully');
                setFieldName('');
                setFieldValue('');
            } catch (error) {
                console.error('Error adding data:', error);
            }
        }
    };

    // Function to remove data from the user's collection
    const removeData = async (fieldName: string) => {
        if (userId && fieldName) {
            const userDataRef = collection(db, 'userdata');
            const userDocRef = doc(userDataRef, userId);

            try {
                await setDoc(userDocRef, { [fieldName]: deleteField() }, { merge: true });
                console.log('Data removed successfully');
            } catch (error) {
                console.error('Error removing data:', error);
            }
        }
    };

    // Render the component
    return (
        <div>
            <h1>User Data</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                addData();
            }}>
                <input
                    type="text"
                    placeholder="Field Name"
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Field Value"
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                />
                <button type="submit">Add Field</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>Field Name</th>
                    <th>Field Value</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(userData).map(([fieldName, fieldValue]) => (
                    <tr key={fieldName}>
                        <td>{fieldName}</td>
                        <td>{fieldValue as string}</td>
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