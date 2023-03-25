import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import classes from './Layout.module.scss';
import { getArticlesList, logOut, togglePage } from '../../store';
import placeholder from '../../images/placeholder.jpg';

function Layout() {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector((state) => state.authorization);

  return (
    <header className={classes.header}>
      <Link
        className={classes.homePage}
        to="/BlogPlatform/"
        onClick={() => {
          dispatch(
            getArticlesList({
              pageNumber: 1,
              token: user.userName ? user.token : null,
            })
          );
          dispatch(togglePage(1));
        }}>
        Realworld Blog
      </Link>

      {user.userName && (
        <button
          className={classes.create}
          onClick={() => history.push('/BlogPlatform/new-article/')}>
          Create article
        </button>
      )}

      {user.userName && (
        <Link to="/BlogPlatform/profile/" className={classes.user}>
          {user.userName}
          {user.image && (
            <img
              className={classes.avatar}
              src={user.image}
              alt="user avatar"
              onError={(e) => (e.target.src = placeholder)}
            />
          )}
        </Link>
      )}

      {user.userName && (
        <button
          className={[classes.authto, classes.logOut].join(' ')}
          onClick={() => {
            dispatch(logOut());
            history.push('/');
          }}>
          Log Out
        </button>
      )}

      {!user.userName && (
        <button
          className={classes.authto}
          onClick={() => {
            history.push('/BlogPlatform/sign-in/');
          }}>
          Sign In
        </button>
      )}

      {!user.userName && (
        <button
          className={[classes.authto, classes.signUp].join(' ')}
          onClick={() => {
            history.push('/BlogPlatform/sign-up/');
          }}>
          Sign Up
        </button>
      )}
    </header>
  );
}

export default Layout;
