import { createContext, useContext, useState } from "react";
import { addUser, getAllUsers, verifyLogin } from "../api/authService";
import { auth, database, googleProvider } from "../config/firebase-config";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithPopup } from "firebase/auth";
import { getDoc, setDoc, doc } from "firebase/firestore";

const AuthContext = createContext();
export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {

	async function signInWithGoogle() {
		try {
			const resGoogle = await signInWithPopup(auth, googleProvider);
			const { displayName, email, phoneNumber, photoURL, uid } = resGoogle.user;
			const userData = { displayName, email, phoneNumber, photoURL };
			const Users = doc(database, "Users", uid);
			if (!(await getDoc(Users)).exists()) {
				await setDoc(Users, { ...userData, role: 'customer' });
			}
			const res = (await getDoc(Users)).data();
			sessionStorage.setItem('user', JSON.stringify({ userId: uid, displayName: res.displayName, role: res.role }));

			onAuthStateChanged(auth, (user) => {
				if (user) {
					console.log('Login successfully');
				} else {
					console.log('User is not signed in');
				}
			});
			return res;
		} catch (error) {
			console.error('An error occurred during sign in with Google:', error);
		}
	}
	async function login(formData) {   //{email, password }
		try {
			const { message, statusCode, userData } = await verifyLogin(formData);
			if (statusCode === 200) {
				const { password, ...user } = userData;
				sessionStorage.setItem('user', JSON.stringify({ userId: user.userId, displayName: user.displayName, role: user.role }));
				return { message: "Register successfully", statusCode: statusCode };
			}
		} catch (error) {
			if (error.response && error.response.status) {
				const statusCode = error.response.status;
				switch (statusCode) {
					case 401:
						return { message: "Your email (or) password wrong!", statusCode: statusCode }; //password wrong!
					case 404:
						return { message: "Your email (or) password wrong!", statusCode: statusCode }; // Email wrong!
					default:
						return { message: "Login fail!", statusCode: error.status };
				}
			} else {
				return { message: "An error occurred: " + error.message };
			}
		}
	}
	async function signUp(formData) {
		try {
			const { displayName, phoneNumber, email, password } = formData;
			const { statusCode } = await addUser({ displayName, phoneNumber, email, password });

			switch (statusCode) {
				case 201:
					return { message: "Register successfully", statusCode: statusCode };
				default:
					return { message: "Unexpected status code", statusCode: statusCode };
			}
		} catch (error) {
			if (error.response && error.response.status) {
				const statusCode = error.response.status;
				switch (statusCode) {
					case 400:
						return { message: "Your email already exists" };
					default:
						return { message: "Unexpected error status code: " + statusCode };
				}
			} else {
				return { message: "An error occurred: " + error.message };
			}
		}
	}

	async function resetPassword(email) {
		return sendPasswordResetEmail(auth, email, {
			url: window.location.origin + `/login`,
		}).catch((error) => {
			// Handle Errors
			const errorMessage = error.message;
			console.error(error);

			alert(errorMessage);
		});
	}

	async function getUsers() {
		return getAllUsers();
	}

	const values = {
		login,
		signInWithGoogle,
		signUp,
		getUsers,
		resetPassword
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
