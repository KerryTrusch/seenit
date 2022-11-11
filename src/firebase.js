import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, query, where, updateDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyD52fctGJgix4vZRVdEl2GfOfkTlWVUWLM",
  
    authDomain: "chataround-e0a27.firebaseapp.com",
  
    projectId: "chataround-e0a27",
  
    storageBucket: "chataround-e0a27.appspot.com",
  
    messagingSenderId: "864357739764",
  
    appId: "1:864357739764:web:36282fb9835bfb3cc602a1",
  
    measurementId: "G-N59MWEL65N"
  
  };
  
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export function createCommunity(name, user) {
  const data = {
    communityName: name,
    description: "Welcome to " + name
  }
  setDoc(doc(db, "communities", name), data);
  joinCommunity(name, user);
}

export function joinCommunity(name, user) {
  const data = {
    email: user,
    communityName: name
  };
  setDoc(doc(db, "users_in_community", name+user), data);
}

export async function getCommunityData(name) {
  const docRef = doc(db, "communities", name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
}

export async function getTotalUsersInCommunity(name) {
  const q = query(collection(db, "users_in_community"), where("communityName", "==", name));
  const qSnap = await getDocs(q);
  return qSnap.size;
}

export async function getCommunityNames() {
  const q = query(collection(db, "communities"));
  const qSnap = await getDocs(q);
  const ret = []
  qSnap.forEach((doc) => {
    ret.push(doc.data().communityName);
  })
  return ret;
}

export async function createPost(title, community, link, image, body, postType, timestamp, username, hash) {
  const data = {
    postTitle: title,
    communityName: community,
    linksrc: link,
    imagesrc: image,
    postBody: body,
    type: postType,
    timestamp: timestamp,
    author: username,
    upvotes: 0,
    hash: hash
  }
  setDoc(doc(db, "posts", hash), data);
}

export async function getPostsFromCommunity(community) {
  const q = query(collection(db, "posts"), where("communityName", "==", community));
  const qSnap = await getDocs(q);
  const ret = []
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  })
  return ret;
}

export async function getPostsForHomepage() {
  const q = query(collection(db, "posts"));
  const qSnap = await getDocs(q);
  const ret = []
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  })
  return ret;
}

export async function upvotePost(hash) {
  console.log(hash);
  const postRef = doc(db, "posts", hash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  updateDoc(postRef, {
    upvotes: upvotes+1
  });
}

export async function downvotePost(hash) {
  console.log(hash);
  const postRef = doc(db, "posts", hash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  console.log(upvotes);
  updateDoc(postRef, {
    upvotes: upvotes-1
  });
}