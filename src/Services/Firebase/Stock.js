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

const ProductServices = { getAll, create, update, remove };

export default ProductServices;
