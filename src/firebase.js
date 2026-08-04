import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

// Firebase Configuration (Environment or default Pan-African AI4SMEs Project)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAI4SMEsAfricaPanAfricanKeyDemo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ai4smes-africa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ai4smes-africa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ai4smes-africa.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "987654321012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:987654321012:web:ai4smesafrica001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Database Helper Functions for SME Operating System

/** Invoices Collection */
export async function dbSaveInvoice(invoiceData) {
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      ...invoiceData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore save fallback to local:", error);
    return { success: false, error: error.message };
  }
}

export async function dbGetInvoices() {
  try {
    const q = query(collection(db, "invoices"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firestore get fallback:", error);
    return null;
  }
}

/** Leads & CRM Collection */
export async function dbSaveLead(leadData) {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      ...leadData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore lead save fallback:", error);
    return { success: false, error: error.message };
  }
}

/** Marketing Campaigns Collection */
export async function dbSaveCampaign(campaignData) {
  try {
    const docRef = await addDoc(collection(db, "campaigns"), {
      ...campaignData,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.warn("Firestore campaign save fallback:", error);
    return { success: false, error: error.message };
  }
}

export default app;
