# withFirebaseClaims

<h3>a ReactJS HOC that prevents component load if a user does not possess required Firebase custom claims</h3>

<p>This solution is based on a great Firebase auth setup with React by Robin Wieruch, go check it out here: https://github.com/the-road-to-react-with-firebase/react-firebase-authentication</p>
<p>Tutorial: https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial/#react-firebase-protected-routes<p/>
<p>NOTE: You will require the above setup in order to use the HOC provided in this repo as it uses Firebase context components that are defined in the above project by Robin, otherwise amend as required.<p/>
<hr/>
<p><b>withAuthz.js</b> is the HOC that checks if a user possesses custom claims defined in the <b>Home.js</b> component that is passed to the HOC for rendering. This is just an alternative way to protect your components from unauthorised access if you utilise custom claims. Robin's project shows how to protect components based on user roles defined in your Firebase database.</p>

<b>Controlling Access with Custom Claims by Firebase: https://firebase.google.com/docs/auth/admin/custom-claims</b>
