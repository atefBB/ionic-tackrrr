import supabase from "../lib/supabase";

import "../styles/Header.scss";

const Header = ({ user }: any) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <header>
      <div className="header__logo">trackrrr</div>
      {user && (
        <div className="header__user">
          <p className="header__user-email">{user.email}</p>|
          <button className="header__user-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
