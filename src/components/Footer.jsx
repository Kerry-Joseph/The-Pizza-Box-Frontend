const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__info">
                <div className="footer__info--company">
                    <h1>Company</h1>
                    <p>Our History</p>
                    <p>Fundraising</p>
                    <p>The Box Blog</p>
                </div>
                <div className="footer__info--careers">
                    <h1>Careers</h1>
                    <p>Store Jobs</p>
                    <p>Corporate Jobs</p>
                    <p>Distribution Jobs</p>
                </div>
                <div className="footer__info--food">
                    <h1>Food</h1>
                    <p>Nutrition</p>
                    <p>Gluten-free</p>
                    <p>Food Quality</p>
                </div>
                <div className="footer__info--connect">
                    <h1>Connect</h1>
                    <p>Contact Us</p>
                    <p>Merch Shop</p>
                    <p>FAQs</p>
                </div>
            </div>
            <div className="footer__socials">
                <div className="footer__socials--apps">
                    <img id="facebook" src="transparent.png" alt="facebook logo" width="1" height="1" />
                    <img id="twitter" src="transparent.png" alt="twitter logo" width="1" height="1" />
                    <img id="instagram" src="transparent.png" alt="instagram logo" width="1" height="1" />
                    <a href="https://www.linkedin.com/in/kerry-kemar-joseph/" target="_blank">
                        <img id="linkedIn" src="transparent.png" alt="linkedIn logo" width="1" height="1" />
                    </a>
                </div>
                <div className="footer__socials--stores">
                    <img id="app-store" src="transparent.png" alt="app store logo" width="1" height="1" />
                    <img id="play-store" src="transparent.png" alt="play store logo" width="1" height="1" />
                </div>
            </div>
            <div className="footer__copyright">
                <div className="footer__copyright--tos">
                    <p>Terms of Service</p>
                    <p>Privacy Policy</p>
                    <p>California Privacy Policy</p>
                    <p>Do Not Sell My Information</p>
                    <p>¿Español?</p>
                </div>
                <div className="footer__copyright--rights">
                    <p>©2022-2022 Pizza Box Enterprises, Inc. All rights reserved. 
                        The Pizza Box® Pizza name, 
                        logos and related marks are trademarks licensed to Pizza Box Enterprises, Inc.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer