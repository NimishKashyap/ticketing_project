import buildClient from "../api/buildClient";

function LandingPage({ currentUser }) {
  return currentUser ? (
    <h1>You are signed in </h1>
  ) : (
    <h1>You are not signed in</h1>
  );
}

// Cross-name space communication
// http://NAMEOFSERVICE.NAMESPACE.svc.local

LandingPage.getInitialProps = async (context) => {
  console.log("Landing Page");
  const { data } = await buildClient(context).get("/api/users/currentuser");

  return data;
};

export default LandingPage;
