import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';

const productsCollections = collection(db, 'Productos');

const getAll = async () => {
  const snapshot = await getDocs(productsCollections);
  const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return products;
};

const create = async (newObject) => {
  const docRef = await addDoc(productsCollections, newObject);
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data() };
};

const update = async (id, newObject) => {
  const productDoc = doc(db, 'Productos', id);
  await updateDoc(productDoc, newObject);
  const updatedDoc = await getDoc(productDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const remove = async (id) => {
  const productDoc = doc(db, 'Productos', id); 
  await deleteDoc(productDoc);
  return { id }; 
};

const getById = async (id) => {
  const userDoc = doc(db, 'Productos', id);
  const docSnap = await getDoc(userDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Producto no encontrado');
  }
}; 

const ProductServices = { getAll, create, update, remove, getById };

export default ProductServices;
