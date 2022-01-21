import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";

export default function GoogleLoginForm({ onSubmit }) {
  const clientId =
    "896125573967-picpu24d0iblili5u6oqnj18tb193733.apps.googleusercontent.com";

  const onLoginSuccess = (res) => {
    const profile = res.profileObj;
    console.log("Login Successful", profile);
    toast.success("Login Successful, check profile in console")
    // onSubmit()
  };
  const onFailureSuccess = (res) => {
    console.log("Login Failed", res);
  };

  return (
    <GoogleLogin
      clientId={clientId}
      onSuccess={onLoginSuccess}
      onFailure={onFailureSuccess}
      cookiePolicy={"single_host_origin"}
      render={(renderProps) => (
        <button
          className="button btn--border btn--hover-border btn--full-width btn--flex btn--hover-trans"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <div className="button__icon">
            <ion-icon name="logo-google"></ion-icon>
          </div>
          <div className="button__text">Continue with Google</div>
        </button>
      )}
    />
  );
}
