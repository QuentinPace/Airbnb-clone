import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaAirbnb } from "react-icons/fa";
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
      <div data-testid="logo">
        <NavLink className='air-bnb-home' style={{ textDecoration: 'none' }} to="/"><FaAirbnb className='air-bnb-home-icon'/><h2 className='airbnb-home-text'>Airbnb</h2></NavLink>
      </div>
      {isLoaded && (
        <div className='user-dropdown-container'>
          {sessionUser && <button data-testid='create-new-spot-button' className='create-spot-button' onClick={createSpotClick}>Create a Spot</button>}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </header>
  );
}

export default Navigation;