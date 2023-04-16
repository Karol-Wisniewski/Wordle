import '../App.scss';
import { Link } from 'react-router-dom';
import plus from '../Utils/plus.png';
import polishFlag from '../Utils/polishFlag.png';
import statistics from '../Utils/statistics.png';
import settings from '../Utils/settings.png';
import question from '../Utils/question.png';

function Header() {
  return (
    <div className="Header">
      <div className="header-left">
        <button>
            <img src={polishFlag} alt="pl-flag" />
            <span>PL</span>
        </button>
        <button>
            <img src={plus} alt="plus" />
        </button>
      </div>
      <div className="header-mid">
        <button>
          <Link className="link" to="/">Wordle</Link>
        </button>
      </div>
      <div className="header-right">
        <button>
            <img src={statistics} alt="statistics" />
        </button>
        <button>
            <img src={settings} alt="settings" />
        </button>
        <button>
          <Link className="link" to="/rules">
            <img src={question} alt="question" />
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Header;
