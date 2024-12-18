// eslint-disable-next-line import/namespace
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState, JSX } from "react";
import { UserContext } from "../UserContextProvider.tsx";
import { logoutUser } from "../utils/utils.ts";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { user, removeUser } = useContext(UserContext);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  async function handleLogout(e: { preventDefault: () => void }): Promise<void> {
    e.preventDefault();
    setOpenMenu(false);

    const logout = await logoutUser();
    if (logout) {
      removeUser();
    }
  };

  function toggleMenu(): void {
    setOpenMenu(prevState => !prevState);
  }

  function navigateToProfile() {
    setOpenMenu(false);
    navigate("/profile");
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <header className="flex justify-between bg-slate-300 p-2 border-b-2 border-slate-400">
      <Link to={"/"} className="hover:underline">
        Customer Relationship Management
      </Link>
      {user.username ? (
        <div ref={menuRef} className="relative">
          {"Hello "}
          <button onClick={toggleMenu}>
            <span className="font-semibold hover:underline">
              {user.username}
            </span>
          </button>
          {openMenu && (
            <div className="absolute bg-slate-300 mt-2 px-2 border-2 border-slate-400 right-[-8px]">
              <button onClick={navigateToProfile} className="whitespace-nowrap hover:underline">
                {`${user.firstName} ${user.lastName}`}
              </button>
              <button onClick={handleLogout} className="font-semibold hover:underline">
                Log out
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to={"/login"} className="hover:underline">
          Login
        </Link>
      )}
    </header>
  );
}

export default Header;
