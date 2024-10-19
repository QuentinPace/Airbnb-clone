import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(true)
  const { closeModal } = useModal()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };


  useEffect(() => {
    const useEffectArr = [email, username, firstName, lastName, password, confirmPassword]
    if(useEffectArr[1].length < 4 || useEffectArr[4].length < 6){
      setDisabled(true)
      return
    }
    for(let i = 0; i < useEffectArr.length; i++){
      if(!useEffectArr[i].length){
        setDisabled(true)
        return
      }
    }
    setDisabled(false)
  }, [email, username, firstName, lastName, password, confirmPassword])

  

  return (
    <div className='signup-form-container' data-testid='sign-up-form'>
      <h1>Sign Up</h1>
      <div className='errors-container'>
        {errors.email && <p className='error'>{errors.email}</p>}
        {errors.username && <p className='error'>{errors.username}</p>}
        {errors.firstName && <p className='error'>{errors.firstName}</p>}
        {errors.lastName && <p className='error'>{errors.lastName}</p>}
        {errors.password && <p className='error'>{errors.password}</p>}
        {errors.confirmPassword && <p className='error'>{errors.confirmPassword}</p>}
      </div>
      <form className='signup-form-form-ele' onSubmit={handleSubmit}>
          <input
            data-testid='email-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Email'
          />
          <input
            data-testid='username-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder='Username'
          />
          <input
            data-testid='first-name-input'
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder='First Name'
          />
          <input
            data-testid='last-name-input'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder='Last Name'
          />
          <input
            data-testid='password-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
          <input
            data-testid='confirm-password-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder='Confirm Password'
          />
        <button type="submit" data-testid='form-sign-up-button' disabled={disabled}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;