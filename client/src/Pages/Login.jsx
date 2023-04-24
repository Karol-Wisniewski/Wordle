import '../App.scss';
import logo from '../Utils/logo.PNG'
import { Link } from 'react-router-dom';

function Login() {

    return (
    <div className="Home">
        <div className="home-left">
            <div className="home-left-div">
                <div className="home-left-logo-div">
                    <img src={logo} alt="logo" />
                    <b>Wordle</b>
                </div>
                <h1>Login to your account</h1>
                <div className="home-left-form-div">
                    <hr />
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <button>
                        Sign in
                    </button>
                    <button className="register-btn">
                        <Link className="link" to="/register">Sign up</Link>
                    </button>
                </div>
            </div>
        </div>
        <div className="home-right">
            <div className="home-right-div">
                <b>New here? </b>
                <b>Register to play!</b>
                <p>Register now, solve your wordles and be better than everybody!</p>
                <button>
                    <Link className="link" to="/register">Sign up</Link>
                </button>
            </div>
        </div>
    </div>
    );
}

export default Login;
