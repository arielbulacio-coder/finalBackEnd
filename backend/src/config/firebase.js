import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
dotenv.config();

let db = null;

try {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  const isConfigured = 
    projectId && projectId !== 'your-project-id' &&
    clientEmail && clientEmail !== 'your-firebase-client-email@gserviceaccount.com' &&
    privateKey && !privateKey.includes('...');

  if (isConfigured) {
    // Replace double escaped newlines
    const formattedPrivateKey = privateKey.replace(/\\n/g, '\n').replace(/"/g, '');
    
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: formattedPrivateKey,
      })
    });
    
    db = getFirestore();
    console.log('🔥 Firebase Admin SDK initialized successfully.');
  } else {
    console.warn('⚠️ WARNING: Firebase configuration is missing or placeholder. Running in Mock In-Memory Database mode.');
  }
} catch (error) {
  console.error('❌ Error initializing Firebase Admin:', error.message);
  console.warn('⚠️ Falling back to Mock In-Memory Database mode.');
  db = null;
}

export { db };
