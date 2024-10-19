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
    <div data-testid='login-modal'>
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
      {errors.credential && <p className='error'>{errors.credential}</p>}
          <input
            data-testid='credential-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            placeholder='Username or Email'
          />
          <input
          data-testid='password-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        <button type="submit" data-testid='login-button' disabled={disabled}>Log in</button>
        <button onClick={demoLogIn}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;