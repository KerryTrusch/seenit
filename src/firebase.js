import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  increment,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD52fctGJgix4vZRVdEl2GfOfkTlWVUWLM",

  authDomain: "chataround-e0a27.firebaseapp.com",

  projectId: "chataround-e0a27",

  storageBucket: "chataround-e0a27.appspot.com",

  messagingSenderId: "864357739764",

  appId: "1:864357739764:web:36282fb9835bfb3cc602a1",

  measurementId: "G-N59MWEL65N",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export async function createUser(email, username, password) {
  if (email === null || username === null || password === null) {
    //will return error in future.
    return;
  }
  let user = null;
  let uid = null;
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      user = userCredential.user;
      uid = user.uid;
      const data = {
        uid: uid,
        username: username,
        email: email,
        karma: 0,
        profilePictureHash: null,
      };
      setDoc(doc(db, "users", username), data);
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
}

export async function signInUser(email, password) {
  if (email === null || password === null) {
    //will return error in future
    return null;
  }
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      
      // user = userCredential.user;
      return userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    });
}

export async function uploadProfilePicture(email, image) {
  let imageHash = Date.now().toString(36);
  const imageRef = ref(storage, imageHash);
  uploadBytes(imageRef, image).then((snapshot) => {
    console.log("Successfully uploaded the file");
  });
  const postRef = doc(db, "users", email);
  updateDoc(postRef, {
    profilePictureHash: imageHash
  });
}

export function createCommunity(name, user) {
  const data = {
    communityName: name,
    description: "Welcome to " + name,
  };
  setDoc(doc(db, "communities", name), data);
  joinCommunity(name, user);
}

export function joinCommunity(name, user) {
  const data = {
    email: user,
    communityName: name,
  };
  setDoc(doc(db, "users_in_community", name + user), data);
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
  const q = query(
    collection(db, "users_in_community"),
    where("communityName", "==", name)
  );
  const qSnap = await getDocs(q);
  return qSnap.size;
}

export async function getCommunityNames() {
  const q = query(collection(db, "communities"));
  const qSnap = await getDocs(q);
  const ret = [];
  qSnap.forEach((doc) => {
    ret.push(doc.data().communityName);
  });
  return ret;
}

export async function createPost(
  title,
  community,
  link,
  image,
  body,
  postType,
  timestamp,
  username,
  hash
) {
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
    hash: hash,
    numComments: 0,
  };
  if (postType === "image") {
    let imageHash = Date.now().toString(36);
    const imageRef = ref(storage, imageHash);
    uploadBytes(imageRef, image).then((snapshot) => {
      console.log("Successfully uploaded the file");
    });
    data.imagesrc = imageHash;
  }
  setDoc(doc(db, "posts", hash), data);
}

export async function getPostsFromCommunity(community) {
  const q = query(
    collection(db, "posts"),
    where("communityName", "==", community)
  );
  const qSnap = await getDocs(q);
  const ret = [];
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  });
  return ret;
}

export async function getPostsForHomepage() {
  const q = query(collection(db, "posts"));
  const qSnap = await getDocs(q);
  const ret = [];
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  });
  return ret;
}

export async function getSinglePost(hash) {
  const docRef = doc(db, "posts", hash);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export async function upvotePost(hash) {
  const postRef = doc(db, "posts", hash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  updateDoc(postRef, {
    upvotes: upvotes + 1,
  });
  changeUserKarma(postSnap.data().author, 1);
}

export async function changeUserKarma(username, upOrDown) {
  let ref = doc(db, "users", username);
  updateDoc(ref, {
    karma: increment(1 * upOrDown)
  })
}

export async function downvotePost(hash) {
  const postRef = doc(db, "posts", hash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  updateDoc(postRef, {
    upvotes: upvotes - 1,
  });
  changeUserKarma(postSnap.data().author, -1);
}
async function _incrementNumComments(hash) {
  const postRef = doc(db, "posts", hash);
  const postSnap = await getDoc(postRef);
  console.log(postSnap.data());
  const coms = postSnap.data().numComments;
  updateDoc(postRef, {
    numComments: coms + 1,
  });
}
export async function createComment(
  user,
  body,
  timestamp,
  parentID,
  postHash,
  commentHash
) {
  const data = {
    user: user,
    body: body,
    timestamp: timestamp,
    parentID: parentID,
    postHash: postHash,
    commentID: commentHash,
    upvotes: 0,
  };
  await setDoc(doc(db, "comments", commentHash), data);
  await _incrementNumComments(postHash);
}

export async function loadCommentsFromPost(hash) {
  const q = query(
    collection(db, "comments"),
    where("postHash", "==", hash),
    where("parentID", "==", null)
  );
  const qSnap = await getDocs(q);
  const ret = [];
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  });
  return ret;
}

export async function upvoteComment(commentHash) {
  const postRef = doc(db, "comments", commentHash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  updateDoc(postRef, {
    upvotes: upvotes + 1,
  });
  changeUserKarma(postSnap.data().author, 1);
}

export async function downvoteComment(commentHash) {
  const postRef = doc(db, "comments", commentHash);
  const postSnap = await getDoc(postRef);
  const upvotes = postSnap.data().upvotes;
  updateDoc(postRef, {
    upvotes: upvotes - 1,
  });
  changeUserKarma(postSnap.data().author, -1);
}

export async function getRepliedComments(parentID) {
  const q = query(
    collection(db, "comments"),
    where("parentID", "==", parentID)
  );
  const qSnap = await getDocs(q);
  const ret = [];
  qSnap.forEach((doc) => {
    ret.push(doc.data());
  });
  return ret;
}

export async function getImage(imagehash) {
  const img = document.createElement("img");
  await getDownloadURL(ref(storage, imagehash)).then((url) => {
    img.setAttribute("src", url);
  });
  return img;
}

export async function getSensitiveUserInformation(uid) {
  //check auth token to make sure you can access the private information
  const q = query(
    collection(db, "users"),
    where("uid", "==", uid)
  );
  const qSnap = await getDocs(q);
  let ret = null;
  qSnap.forEach((data) => {
    ret = data.data();  
  })
  return ret;
  //if auth is successful, return everything from the user in the user collection
  //in the public user function, you just return the public info about them. (name, karma).

  //auth token (something containing a username and password) encoded with something simple in the header varifies api requests
  //without the token, the request can just return the 403 error or whatever the authentication error number is 
  //in our case, we send the uid as knowing this is as sensitive as a username:password combination
}
