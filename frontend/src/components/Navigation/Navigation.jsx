import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      {isLoaded && (
        <div className='user-dropdown-container'>
          <ProfileButton className='user-menu' user={sessionUser} />
        </div>
      )}
    </header>
  );
}

export default Navigation;