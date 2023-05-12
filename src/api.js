import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function register(email, password) {
    try{
        const oUC = await createUserWithEmailAndPassword(
            getAuth(),
            email,
            password
        );
        return oUC.user;
    }
    catch(err){
        return err.code;
    }
}

export async function login(email, password) {
    try{
        const oUC = await signInWithEmailAndPassword(
            getAuth(),
            email,
            password
        );
        return oUC.user;
    }
    catch(err){
        return err.code;
    }
}

export async function logout() {
    try{
        await signOut(getAuth());
    }
    catch(err){
        return err.code;
    }
}