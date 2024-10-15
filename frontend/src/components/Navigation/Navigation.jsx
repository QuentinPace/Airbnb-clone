import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate()

  const createSpotClick = () => {
    navigate('/spots/new')
  }

  return (
    <header>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      {isLoaded && (
        <div className='user-dropdown-container'>
          <button onClick={createSpotClick}>Create a Spot</button>
          <ProfileButton className='user-menu' user={sessionUser} />
        </div>
      )}
    </header>
  );
}

export default Navigation;