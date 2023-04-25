import '../App.scss';
import logo from '../Utils/logo.PNG'
import { Link } from 'react-router-dom';

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
                    <div className="register-p-div">
                        <p className="register-p">Already have an account?</p>
                        <p className="register-p">Hop right in!</p>
                    </div>
                    <button className="register-btn">
                        <Link className="link" to="/">Sign in</Link>
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
                    <Link className="link" to="/">Sign in</Link>
                </button>
            </div>
        </div>
    </div>
  );
}

export default Register;
