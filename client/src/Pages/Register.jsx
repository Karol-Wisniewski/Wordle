import '../App.scss';
import logo from '../Utils/logo.PNG'

function Register() {
  return (
    <div className="Home">
        <div className="home-left">
            <div className="home-left-div">
                <div className="home-left-logo-div">
                    <img src={logo} alt="logo" />
                    <b>Wordle</b>
                </div>
                <h1>Create an account</h1>
                <div className="home-left-form-div">
                    <hr />
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <button>
                        Sign up
                    </button>
                    <button className="register-btn">
                        Sign in
                    </button>
                </div>
            </div>
        </div>
        <div className="home-right">
            <div className="home-right-div">
                <b>Already have an account? </b>
                <b>Login to play!</b>
                <p>Don't miss out on our daily challenges!</p>
                <button>
                        Sign in
                </button>
            </div>
        </div>
    </div>
  );
}

export default Register;
