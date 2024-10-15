import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if(credential.length < 4 || password.length < 6){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }

  }, [credential, password, setDisabled])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors({credential: 'The provided credentials were invalid'});
        }
      });
  };

  const demoLogIn = () => {
    setCredential('Demo-lition')
    setPassword('password')
    return handleSubmit
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
      {errors.credential && <p>{errors.credential}</p>}
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        <button type="submit" disabled={disabled}>Log In</button>
        <button onClick={demoLogIn}>Log in as Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;