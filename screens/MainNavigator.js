import { useEffect, useState } from "react";
import AuthNavigator from "./AuthNavigator";
import NoAuthNavigator from "./NotAuthNavigator";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import Splash from "../components/SplashScreen";

const MainNavigator = () => {
    const [isAuth, setIsAuth] = useState();

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, 
            (user) => {
                if (user) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            }
        );
        // return deactivateListener()
    }, [])

    const Navigator = isAuth ?
        AuthNavigator :
        NoAuthNavigator

    return (
            isAuth === undefined ?
                <Splash /> :
                <Navigator />
    )
}

export default MainNavigator;