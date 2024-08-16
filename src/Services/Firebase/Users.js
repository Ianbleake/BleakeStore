import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

const usersCollections = collection(db, 'Users');

const getAll = async () => {
  const snapshot = await getDocs(usersCollections);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return users;
};

const create = async (newObject) => {
  const docRef = await addDoc(usersCollections, newObject);
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data() };
};

const update = async (id, newObject) => {
  const userDoc = doc(db, 'Users', id);
  await updateDoc(userDoc, newObject);
  const updatedDoc = await getDoc(userDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

export default { getAll, create, update }