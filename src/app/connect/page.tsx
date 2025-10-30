
"use client";

import { useEffect, useState } from "react";

export default function ConnectPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Connexion (Simulation Firestore)</title>
        <script src="https://cdn.tailwindcss.com/script"><\/script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
            body { font-family: 'Inter', sans-serif; background-color: #f7f7f9; }
            .card { transition: all 0.3s ease; }
            .card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }
            .message-box { min-height: 5rem; }
            .checkbox-label { display: flex; align-items: center; gap: 0.5rem; user-select: none; }
        </style>
    </head>
    <body class="p-4 sm:p-8 min-h-screen flex items-center justify-center">

        <div id="app-container" class="w-full max-w-4xl space-y-8">
            <h1 class="text-3xl font-bold text-center text-red-700">ATTENTION : SIMULATION NON SÉCURISÉE (Firestore)</h1>
            <p class="text-center text-sm text-red-500 font-semibold">Cette version enregistre les mots de passe en clair dans Firestore, ce qui est très dangereux pour un déploiement réel.</p>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                <!-- Inscription (Sign Up) -->
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-red-300">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-800">1. Enregistrer le Profil (Inscription)</h2>
                    <form id="signup-form" class="space-y-4">
                        <input type="text" id="signup-identite" placeholder="Nom d'utilisateur (identite)" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                        <input type="email" id="signup-email" placeholder="Email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                        <input type="password" id="signup-password" placeholder="Mot de passe NON HACHÉ" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                        <select id="signup-genre" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                            <option value="Femme">Femme</option>
                            <option value="Homme">Homme</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <select id="signup-role" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500">
                            <option value="Membre">Membre</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div class="space-y-2 text-sm text-gray-600">
                           <label class="checkbox-label"><input type="checkbox" id="signup-etudiant" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"><span>Je suis étudiant(e)</span></label>
                           <label class="checkbox-label"><input type="checkbox" id="signup-majeur" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"><span>Je suis majeur(e)</span></label>
                        </div>
                        <button type="submit" class="w-full bg-red-600 text-white p-3 rounded-lg font-semibold hover:bg-red-700 transition duration-150">ENREGISTRER PROFIL NON SÉCURISÉ</button>
                    </form>
                </div>

                <!-- Connexion (Sign In) -->
                <div class="card bg-white p-6 rounded-xl shadow-lg border border-red-300">
                    <h2 class="text-2xl font-semibold mb-4 text-gray-800">2. Connexion (Vérification directe)</h2>
                    <form id="signin-form" class="space-y-4">
                        <input type="text" id="signin-identite" placeholder="Identifiant" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <input type="password" id="signin-password" placeholder="Mot de passe" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                        <button type="submit" class="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition duration-150">TENTER LA CONNEXION</button>
                    </form>
                </div>
            </div>

            <!-- Section Statut et Messages -->
            <div class="bg-gray-800 text-white p-6 rounded-xl shadow-inner">
                <h3 class="text-xl font-semibold mb-2 text-red-300">Statut de la Simulation</h3>
                <div id="auth-status" class="space-y-1 text-sm">
                    <p>Statut : <span id="status-text" class="font-bold text-yellow-400">Initialisation...</span></p>
                    <p>Email du Profil Connecté : <span id="email-text" class="text-gray-400 break-all">N/A</span></p>
                    <p>Identité du Profil : <span id="identite-text" class="text-gray-400">N/A</span></p>
                </div>
                <div id="message-box" class="message-box mt-4 p-3 bg-red-900/50 rounded-lg text-sm text-red-100">
                    Messages de l'application s'afficheront ici.
                </div>
            </div>
        </div>

        <!-- Firebase SDK Imports -->
        <script type="module">
            import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
            import { 
                getAuth, 
                signInAnonymously, 
                signInWithCustomToken, 
                onAuthStateChanged 
            } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
            import { 
                getFirestore, 
                doc, 
                setDoc,
                getDocs,
                collection,
                query, 
                where,
                Timestamp
            } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

            // Global variables for Canvas environment (MANDATORY)
            const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
            const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
            const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

            let app, db, auth;
            let currentProfile = null;
            const COLLECTION_NAME = 'connexion'; // Updated collection name

            // --- Fonctions utilitaires et UI ---

            const updateMessage = (message, isError = false) => {
                const box = document.getElementById('message-box');
                if (!box) return;
                box.textContent = message;
                box.className = isError 
                    ? 'message-box mt-4 p-3 bg-red-700/80 rounded-lg text-sm text-white' 
                    : 'message-box mt-4 p-3 bg-green-900/50 rounded-lg text-sm text-green-100';
            };
            
            const updateUI = (profile = null) => {
                const statusText = document.getElementById('status-text');
                const emailText = document.getElementById('email-text');
                const identiteText = document.getElementById('identite-text');

                if (profile) {
                    if(statusText) statusText.textContent = 'Profil Connecté (Non sécurisé)';
                    if(statusText) statusText.className = 'font-bold text-green-400';
                    if(emailText) emailText.textContent = profile.email || 'N/A';
                    if(identiteText) identiteText.textContent = profile.identite || 'N/A';
                } else {
                    if(statusText) statusText.textContent = 'Déconnecté';
                    if(statusText) statusText.className = 'font-bold text-red-400';
                    if(emailText) emailText.textContent = 'N/A';
                    if(identiteText) identiteText.textContent = 'N/A';
                }
            };

            // --- Logique Firestore ---
            
            const saveUserProfile = async (profileData) => {
                if (!db) return;
                // CORRECTED: Write directly to the root 'connexion' collection
                const collectionRef = collection(db, COLLECTION_NAME);
                
                // Use identite for document ID for simplicity in this test
                const docId = profileData.identite;
                if (!docId) throw new Error("L'identifiant ne peut pas être vide.");
                const profileRef = doc(collectionRef, docId);

                await setDoc(profileRef, profileData);
                updateMessage(\`Profil "\${profileData.identite}" enregistré dans Firestore à la racine de la collection 'connexion'.\`, false);
                return profileData;
            };
            
            const simulateSignIn = async (identite, password) => {
                if (!db) return null;
                // CORRECTED: Read from the root 'connexion' collection
                const collectionRef = collection(db, COLLECTION_NAME);

                const q = query(
                    collectionRef, 
                    where("identite", "==", identite),
                    where("password", "==", password)
                );

                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    return null;
                }

                return querySnapshot.docs[0].data();
            };


            // --- Logique des formulaires ---

            const handleSignUp = async (e) => {
                e.preventDefault();
                const identite = document.getElementById('signup-identite')?.value;
                const email = document.getElementById('signup-email')?.value;
                const password = document.getElementById('signup-password')?.value;
                const role = document.getElementById('signup-role')?.value;
                const genre = document.getElementById('signup-genre')?.value;
                const etudiant = document.getElementById('signup-etudiant')?.checked;
                const majeur = document.getElementById('signup-majeur')?.checked;

                updateMessage('Enregistrement du profil dans Firestore en cours...');

                const profileData = {
                    identite: identite,
                    email: email, 
                    password: password,
                    role: role,
                    genre: genre,
                    etudiant: etudiant,
                    majeur: majeur,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now(),
                    photoURL: "URL de l’avatar",
                    provider: "email",
                    recommandation: "être bien équipé",
                    uid: Math.floor(Math.random() * 1000000)
                };

                try {
                    const profile = await saveUserProfile(profileData);
                    currentProfile = profile;
                    updateUI(currentProfile);
                    updateMessage(\`Profil enregistré et "connecté" (Simulé) : \${email}\`, false);
                } catch (error) {
                    console.error("Erreur d'enregistrement:", error);
                    updateMessage(\`Échec de l'enregistrement: \${error.message}\`, true);
                }
            };

            const handleSignIn = async (e) => {
                e.preventDefault();
                const identite = document.getElementById('signin-identite')?.value;
                const password = document.getElementById('signin-password')?.value;
                
                updateMessage('Tentative de connexion (Firestore Query) en cours...');

                try {
                    const profile = await simulateSignIn(identite, password);

                    if (profile) {
                        currentProfile = profile;
                        updateUI(currentProfile);
                        updateMessage(\`Connexion réussie (Simulée) ! Bienvenue, \${profile.identite}.\`, false);
                    } else {
                        currentProfile = null;
                        updateUI(null);
                        updateMessage('Échec de la connexion : Identifiant ou mot de passe incorrect.', true);
                    }
                } catch (error) {
                    console.error("Erreur de connexion simulée:", error);
                    updateMessage(\`Erreur lors de la connexion simulée: \${error.message}\`, true);
                }
            };


            // --- Initialisation Firebase ---

            const initializeFirebase = async () => {
                if (!firebaseConfig) {
                    updateMessage("Erreur: Configuration Firebase manquante.", true);
                    return;
                }

                try {
                    app = initializeApp(firebaseConfig);
                    auth = getAuth(app);
                    db = getFirestore(app);

                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth); 
                    }
                    
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            updateMessage(\`Utilisateur Firebase Auth (UID: \${user.uid}) prêt pour l'accès Firestore.\`, false);
                        }
                    });


                } catch (error) {
                    console.error("Erreur d'initialisation ou d'authentification:", error);
                    updateMessage(\`Erreur critique Firebase: \${error.message}\`, true);
                }
            };

            // We need to wait for the DOM to be ready before we can add event listeners
            // and interact with the elements.
            
            initializeFirebase();
            document.getElementById('signup-form')?.addEventListener('submit', handleSignUp);
            document.getElementById('signin-form')?.addEventListener('submit', handleSignIn);
            updateUI(null);
        <\/script>
    </body>
    </html>
    `;

    if (!isClient) {
        return null;
    }

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
