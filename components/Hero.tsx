import LoginButton from "./LoginButton";

export default function Hero() {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-5xl font-bold">Welcome to Assassins!</h1>
          <p className="py-6">
            To start playing Assassins live action game, please login.
          </p>
          <LoginButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
