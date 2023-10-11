import React from "react";
import about1 from "../../assets/images/about-pic1.png"
import about2 from "../../assets/images/about-pic2.png"
import { Col, Row, Typography, Layout, Card } from "antd";

function AboutUs() {
  return (
    <div class="inner-web-bg">
    <div class="container">
        <div class="row mb-3">
            <div class="col-lg-12">
                <h2 class="page-heading">About Us</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="about-box">
                    <img src={about1} alt="" class="img-fluid"/>
                    <div class="about-text-box">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                            Proin
                            gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                            tempor.sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            <br/>

                            Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
                            nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                            bibendum
                            laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
                            pulvinar tempor.</p>
                    </div>
                </div>
                <div class="about-box">
                    <div class="about-text-box2">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                            Proin
                            gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
                            tempor.sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                            <br/>

                            Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
                            nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
                            bibendum
                            laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales
                            pulvinar tempor.</p>
                    </div>
                    <div class="text-end">
                        <img src={about2} alt="" class="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default AboutUs;
