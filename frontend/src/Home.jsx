import UserHomePage from "./UserHomePage.jsx";
import LoginForm from "./LoginForm.jsx";

function Home() {
    const isLoggedIn = true;

    return (
        <div className="home-content">
            {isLoggedIn ? <UserHomePage /> : <LoginForm />}
        </div>
    )
}

export default Home;