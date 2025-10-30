'use client';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getFirestore, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { setDocumentNonBlocking } from '../non-blocking-updates';
import { getApp } from 'firebase/app';


interface SignUpData {
  email: string;
  password?: string;
  identite: string;
  genre: 'Femme' | 'Homme' | 'Autre';
  etudiant: boolean;
  majeur: boolean;
}

export async function signUpWithEmail(
  auth: Auth,
  { email, password, identite, genre, etudiant, majeur }: SignUpData
): Promise<UserCredential> {
  if (!password) {
    throw new Error("Le mot de passe est requis pour l'inscription par email.");
  }
  
  const firestore = getFirestore(getApp());

  // Check if identite already exists
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where("identite", "==", identite), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    throw new Error("Cet identifiant est déjà utilisé par un autre membre.");
  }

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userProfile = {
    email: user.email,
    identite: identite,
    genre: genre,
    etudiant: etudiant,
    majeur: majeur,
    role: 'Membre',
    photoURL: user.photoURL || `https://picsum.photos/seed/${user.uid}/100/100`,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    recommandation: "être bien équipé",
  };
  
  const userRef = doc(firestore, 'users', user.uid);
  
  // Using non-blocking write for optimistic UI updates
  setDocumentNonBlocking(userRef, userProfile, { merge: true });

  return userCredential;
}


export async function signInWithIdentifier(
  auth: Auth,
  identite: string,
  password?: string,
): Promise<UserCredential> {
   if (!password) {
    throw new Error("Le mot de passe est requis pour la connexion.");
  }

  const firestore = getFirestore(getApp());
  const usersRef = collection(firestore, 'users');
  const q = query(usersRef, where("identite", "==", identite), limit(1));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    throw new Error(`Aucun utilisateur trouvé avec l'identifiant "${identite}".`);
  }

  const userData = querySnapshot.docs[0].data();
  const email = userData.email;

  if (!email) {
      throw new Error("Le profil utilisateur associé à cet identifiant n'a pas d'email.");
  }

  return signInWithEmailAndPassword(auth, email, password);
}
