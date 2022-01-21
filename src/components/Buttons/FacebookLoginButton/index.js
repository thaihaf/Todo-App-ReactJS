import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";

export default function FacebookLoginButton({ onSubmit }) {
  const appId = "684100939620420";

  const responseFacebook = (response) => {
    console.log("Login Successful ", response);
    toast.success("Login Successful, check profile in console");
    // onSubmit()
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          className="button btn--border btn--hover-border btn--full-width btn--flex btn--hover-trans"
          onClick={renderProps.onClick}
        >
          <div className="button__icon">
            <ion-icon name="logo-facebook"></ion-icon>
          </div>
          <div className="button__text">Continue with Facebook</div>
        </button>
      )}
    />
  );
}
