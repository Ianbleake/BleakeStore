import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';

const usersCollections = collection(db, 'Users');

const getAll = async () => {
  const snapshot = await getDocs(usersCollections);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return users;
};

const getById = async (id) => {
  const userDoc = doc(db, 'Users', id);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('User not found');
  }
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

const remove = async (id) => {
  const userDoc = doc(db, 'Users', id);
  await deleteDoc(userDoc);
  return { id };
};

const userService = { getAll, getById, create, update, remove };

export default userService;
