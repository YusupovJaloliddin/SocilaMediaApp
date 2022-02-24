import React from "react";

function Sites() {
  return (
    <div>
      <br />
      <div className="a">
        <span>
          {" "}
          <img
            src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643749335/weathericons_qkfunt.gif"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Ob-Havo</b>
          <p>Ob-havo Saytimizga tashrif buyiring</p>
          <a
            // target="_blank"
            href="https://weather-app-javascript4633.netlify.app/"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
          <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
        </span>
      </div>
      <div className="a">
        <span>
          {" "}
          <img
            src="data:image/jpeg;base64,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"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Quron Mp3</b>
          <p>Quron eshitmoqchi bo'lsangiz</p>
          <a
            // target="_blank"
            href="https://quran.com/"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
        </span>
      </div>
      <div className="a">
        <span>
          {" "}
          <img
            src="https://c.tenor.com/c3dHVjwgeYgAAAAC/bbc-breaking-news.gif"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Daryo uz</b>
          <p>Yangiliklardan xabardor bo'ling</p>
          <a
            // target="_blank"
            href="https://daryo.uz/"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
        </span>
      </div>
      <div className="a">
        <span>
          {" "}
          <img
            src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643749542/snake_xjuag0.gif"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Snake Game</b>
          <p>Snake Computer game o'yini uchun bu yerga kiring</p>
          <a
            // target="_blank"
            href="https://snakegame-javascirpt-jaloliddin4633.netlify.app"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
          <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
        </span>
      </div>

      <div className="a">
        <span>
          {" "}
          <img
            src="https://res.cloudinary.com/dvngnmkau/image/upload/v1643749704/f5b4e287-d1bf-4e86-886a-82d07372122f_hqgsjf.gif"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Online Calculator</b>
          <p>Hisob kitobli ishlar uchun bu yerga kiring</p>
          <a
            // target="_blank"
            href="https://calculator4633.netlify.app"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
          <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
        </span>
      </div>
      <div className="a">
        <span>
          {" "}
          <img
            src="https://d3mxt5v3yxgcsr.cloudfront.net/courses/6020/course_6020_image.png"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Travel</b>
          <p>Travel sayt bu yerga kiring</p>
          <a
            // target="_blank"
            href="https://traveltheworld4633.netlify.app"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
          <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
        </span>
      </div>
      <div className="a">
        <span>
          {" "}
          <img
            src="https://c.tenor.com/0JPfdf_btbYAAAAM/saat-kac.gif"
            alt="salom"
          />
        </span>
        <span className="name">
          <b style={{ textAlign: "center" }}>Soat</b>
          <p>Vaqtni bilish uchun bu yerga kiring</p>
          <a
            // target="_blank"
            href="https://clock4633.netlify.app"
            rel="noreferrer"
          >
            <button
              className="btn"
              style={{
                marginTop: "10px",
                marginLeft: "30px",
                marginBottom: "10px",
              }}
            >
              Kirish
            </button>
          </a>
          <p style={{ opacity: ".6" }}>createdBy:Jaloliddin</p>
        </span>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default Sites;
