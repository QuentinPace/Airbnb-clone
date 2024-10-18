import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useNavigate } from 'react-router'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef()
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/')
    closeMenu()
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : "-hidden") + (user ? '-logged-in' : '');

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = e => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = e => {
    e.stopPropagation()
    setShowMenu(!showMenu)
  }

  const closeMenu = () => setShowMenu(false);

  const navManageSpots = () => {
    console.log('made it to button click')
    navigate('/spots/current')
    closeMenu()
  }

  return (
    <>
      <button className='user-menu' onClick={toggleMenu}>
        <FaUserCircle className='user-icon'/>
      </button>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <p>Username - {user.username}</p>
            <p> Hello, {user.firstName} {user.lastName}</p>
            <p>Email - {user.email}</p>
            <p><button onClick={navManageSpots}>manage spots</button></p>
            <p>
              <button onClick={logout}>Log Out</button>
            </p>
          </>
        ) : (
          <>
            <p>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </p>
            <p>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileButton;