import { db } from './config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';

//* Banners
const bannersCollection = collection(db, 'Banners');

const getAllBanners = async () => {
  const snapshot = await getDocs(bannersCollection);
  const banners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return banners;
}

const createBanner = async (newObject) => {
  const docRef = await addDoc(bannersCollection,newObject);
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data()};
}

const removeBanner = async (id) => {
  const bannerDoc = doc(db,'Banners',id);
  await deleteDoc(bannerDoc);
  return { id };
}

const getBannerById = async (id)=>{
  const bannerDoc = doc(db, 'Banners', id);
  const docSnap = await getDoc(bannerDoc);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error('Banner no encontrado');
  }
}

const updateBanner = async (id, newObject) => {
  const bannerDoc = doc(db, 'Banners', id);
  await updateDoc(bannerDoc, newObject);
  const updatedDoc = await getDoc(bannerDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const bannersServices = { getAllBanners,createBanner, removeBanner, getBannerById, updateBanner };

//* Marcas
const brandsCollection = collection(db, 'Brands');

const getAllBrands = async () => {
  const snapshot = await getDocs(brandsCollection);
  const brands = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return brands;
}

const brandsServices = { getAllBrands };

export { bannersServices, brandsServices };

const storeServices = { bannersServices, brandsServices };

export default storeServices;
