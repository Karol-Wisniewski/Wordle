import '../App.scss';
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
        Wordle
      </div>
      <div className="header-right">
        <button>
            <img src={statistics} alt="statistics" />
        </button>
        <button>
            <img src={settings} alt="settings" />
        </button>
        <button>
        <img src={question} alt="question" />
        </button>
      </div>
    </div>
  );
}

export default Header;
