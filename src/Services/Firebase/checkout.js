import { db } from './config';
import { collection, getDocs, addDoc, doc, getDoc, deleteDoc, query, where } from 'firebase/firestore';

const pedidosCollection = collection(db, 'Pedidos');

const getAll = async () => {
  const snapshot = await getDocs(pedidosCollection);
  const pedidos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return pedidos;
};

const create = async (newObject) => {
  const docRef = await addDoc(pedidosCollection, newObject);
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data() };
};
const getById = async (id) => {
  const docRef = doc(db, 'Pedidos', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('No se encontró el pedido con el ID proporcionado.');
  }
};

const remove = async (id) => {
  const pedidoDoc = doc(db, 'Pedidos', id); 
  await deleteDoc(pedidoDoc);
  return { id }; 
};

const getByUser = async (userId) => {
  const q = query(pedidosCollection, where('ownerId', '==', userId));
  const querySnapshot = await getDocs(q);
  const pedidos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return pedidos;
};

const checkoutServices = { create, getById, remove, getByUser, getAll };

export default checkoutServices;
