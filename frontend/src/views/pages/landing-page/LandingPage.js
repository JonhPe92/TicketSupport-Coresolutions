import TopNavbar from '../../../ui-component/landing-page/Nav/TopNavbar';
import Contact from './Contact';
import Header from './Header';
import Projects from './Projects';
import Services from './Services';
import Footer from './Footer';
import Products from './Products';

const LandingPage = () => {
    const isAuthenticated = false;
    return (
        <>
            <TopNavbar />
            <Header />
            <Services />
            <Products />
            <Projects />
            <Contact />
            <Footer />
        </>
    );
};
export default LandingPage;
