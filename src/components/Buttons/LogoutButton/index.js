import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userSlice from "../../../redux/reducers/userSlice";

export default function GoogleLogoutButton({ onSubmit }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const clientId =
    "896125573967-picpu24d0iblili5u6oqnj18tb193733.apps.googleusercontent.com";

  const onSignOutSuccess = () => {
    localStorage.clear();
    dispatch(userSlice.actions.setUser({}));

    toast.success("🦄 Logout successfully!");
    navigate("/signIn");
  };

  return (
    <GoogleLogout
      clientId={clientId}
      onLogoutSuccess={onSignOutSuccess}
      render={(renderProps) => (
        <button
          className="signOutBtn button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left "
          style={{ padding: "1.5rem" }}
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Sign out
        </button>
      )}
    ></GoogleLogout>
  );
}
