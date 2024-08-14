import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const usersCollections = collection(db, 'Users');

const getAll = async () => {
  const snapshot = await getDocs(usersCollections);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return users;
};

export default { getAll }