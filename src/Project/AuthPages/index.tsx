import {useState} from 'react';
import Icon from '../../Shared/components/Icon';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Login from './login'
import Signup from './signup'
import CompleteSignup from './completesignup';
import {signInUser, createUser} from '../../firebase';
import { useEffect } from 'react';
interface AuthModalsDetails {
    closeModal: any;
    show: boolean;
    modalType: number;
    setUser: any;
}
const AuthModals = ({closeModal, show, modalType, setUser}: AuthModalsDetails) => {
    const [email, setEmail] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    // 0 -> Login
    // 1 -> Signup
    // 2 -> Complete Signup
    const [currentForm, setCurrentForm] = useState(modalType);
    useEffect(() => {
      setCurrentForm(modalType);
    }, [modalType])
    const handleLogin = async () => {
        let user = await signInUser(email, password);
        return user;
    }
    const handleCreateUser = () => {
        createUser(email, username, password);
    }
    const validateEmail = () => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
      const validatePassword = () => {
        if (password === null) return false;
        return password.length >= 6 && password.length <= 30;
      };    
    return (
        <div
      className={`${
        show ? "block" : "hidden"
      } fixed top-0 left-0 w-full h-full z-10 bg-black/[0.6]`}
    >
      <div
        className="flex flex-col fixed top-[50%] left-[50%] w-[400px] bg-white rounded h-auto translate-x-[-50%] translate-y-[-50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon
          className="ml-auto cursor-pointer pt-4 pr-4"
          icon={faX}
          onClick={closeModal}
        />
       {currentForm === 0 && <Login setUser={setUser} switchTabs={setCurrentForm} login={handleLogin} validateEmail={validateEmail} validatePassword={validatePassword} setEmail={setEmail} setPassword={setPassword}/>}
       {currentForm === 1 && <Signup email={email} setEmail={setEmail} switchTabs={setCurrentForm} />}
       {currentForm === 2 && <CompleteSignup setUser={setUser} switchTabs={setCurrentForm} createAccount={handleCreateUser} setUsername={setUsername} setPassword={setPassword} username={username} password={password}/> }
      </div>
    </div>
    )
}

export default AuthModals;