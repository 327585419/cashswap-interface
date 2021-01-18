/* eslint-disable jsx-a11y/alt-text */
import "./App.css";
import ok from "./img/ok.png";
import bch from "./img/bch.png";
import spice from "./img/spice.png";
import { swap } from "./service/contract";

function App() {
  const exchangeButtonClick = () => {
    swap(500, 2500);
  };

  return (
    <div className="main">
      <div className="content">
        <div className="layout">
          <div className="bch-div">
            <div className="you-are-exchanging">You are exchanging</div>
            <div className="bch-context">
              <div className="bch-left-side">
                <div className="bch-input">
                  <input className="input" value="2500" type="text" />
                  <div className="bch">BCH</div>
                </div>

                <div className="divider" />

                <div className="usd-div">
                  <span>0.01</span>
                  <span>USD</span>
                </div>
              </div>
              <div>
                <img className="bch-image" src={bch} />
              </div>
            </div>
          </div>

          <div className="arrow-icon">
            <img src={ok} />
          </div>

          <div className="spice-div">
            <div className="you-are-exchanging">You will receive</div>
            <div className="bch-context">
              <div className="bch-left-side">
                <div className="bch-input">
                  <input className="spice-input" value="500" type="text" />
                  <div className="spice">SPICE</div>
                </div>

                <div className="divider-spice" />

                <div className="usd-div">
                  <span>0.01</span>
                  <span>USD</span>
                </div>
              </div>
              <div>
                <img className="bch-image" src={spice} />
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-main-div">
          <div className="bottom-text">*All on-chain and liquidity provider fees are included.</div>
          <div>
            <button
              className="button"
              onClick={() => {
                exchangeButtonClick();
              }}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
