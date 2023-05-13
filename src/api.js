import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, push, set, get, query} from "firebase/database"

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

export async function add(user, deed){
    const oRef = await push(
        ref(
            getDatabase(), // получить объект базы данных
            `users/${user.uid}/todos`
        )
    )

    await set(oRef, deed); 
    const oSnapshot = await get(query(oRef));
    const oDeed = oSnapshot.val();
    oDeed.key = oRef.key;
    return oDeed;
}