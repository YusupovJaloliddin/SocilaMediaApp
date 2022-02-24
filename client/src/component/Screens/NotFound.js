import React from "react";
import "./Css/NotFound.css";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <section className="page_404">
      <div className="container aa">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Hech qanday post qo'ymagan ekansiz!!!</h3>

                <Link className="link_404" to="createpost">
                  Add New Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
