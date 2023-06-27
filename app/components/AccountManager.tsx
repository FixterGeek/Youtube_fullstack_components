import Dropdown from "./Dropdown";
import { Menu } from "@headlessui/react";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";

export type UserType = {
  email: string;
};

const AccountManager = () => {
  // 3. redirections
  const navigate = useNavigate();
  // 1. Get user info
  const fetcher = useFetcher();
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = useCallback(async () => {
    fetcher.load("/api/auth");
    if (fetcher.data?.ok) {
      setUser(fetcher.data.user);
    }
  }, [fetcher]);

  // Fetcher observer
  useEffect(() => {
    if (fetcher.data && fetcher.data.ok) {
      setUser(fetcher.data.user);
    } else {
      setUser(null);
    }
  }, [fetcher]);

  // run once, on the beginning
  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line

  // 2. Signout action
  const handleSignout = () => {
    fetcher.submit(
      { intent: "signout" },
      { method: "post", action: "/api/auth" }
    );
  };
  // 3. Redirect action
  // if logged redirect to profile
  // else redirect to /login
  const handleLink = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };
  // 4. login user
  const handleLogin = () => {
    fetcher.submit(
      { intent: "login" },
      { method: "post", action: "/api/auth" }
    );
  };

  return (
    <>
      {!user && <button onClick={handleLogin}>Entrar</button>}
      {user && <p>{user.email}</p>}
      <Dropdown
        cta={
          user ? (
            <img
              className="w-[40px] rounded-full "
              src="https://avatars.githubusercontent.com/u/7883990?v=4"
              alt="user pic"
            />
          ) : null
        }
      >
        {user && (
          <>
            <Menu.Item>
              {() => (
                <button
                  onClick={handleLink}
                  className="py-2 px-2 rounded-sm hover:bg-gray-200 text-black text-md font-medium"
                >
                  Manage account
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {() => (
                <button
                  onClick={handleSignout}
                  className="py-2 px-2 rounded-sm hover:bg-gray-200 text-black text-md font-medium"
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </>
        )}
      </Dropdown>
    </>
  );
};
export default AccountManager;
