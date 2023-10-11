import { Col,Typography, Layout, Row, List, Input, Button } from "antd";
import {
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoYoutube,
  BiLogoInstagram,
} from "react-icons/bi";
import { useNavigate } from "react-router";
import logo from "../../assets/images/ftr-logo.png"
const { Footer } = Layout;
const { TextArea } = Input;

const ClientFooter = () => {
  const navigate = useNavigate()
  return (
    <Footer className="footer" style={{ height: "auto", padding: "0" }}>
      
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-lg-8">
                <img src={logo} alt="" class="img-fluid footer-logo"/>
                <p class="fotr-p">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has
                    been the industry's
                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to
                    make a type specimen book.</p>
                <img src="../assets/images/news.png" alt="" class="img-fluid news"/>
                <p class="fotr-p">By subscribing to our mailing list you will always be <br/>
                    update with the latest news from us.</p>

                <div class="fotr-input">
                    <input type="text" class="form-control" placeholder="Recipient's username" aria-describedby=""/>
                    <button type=" submit">Send Message</button>
                </div>
            </div>
        </div>
    </div>

    </Footer>
  );
};

export default ClientFooter;
