import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

//firebase context
import { withFirebase } from "../Firebase";
import { AuthUserContext } from ".";


//HOC for authorization based on logged in user claims
const withAuthz = (role) => Component => {

    class WithAuthz extends React.Component {
        constructor(props) {
            super(props);

            //givenRole is the role passed by the component being inputted
            this.state = {
                actualRole: null,
                givenRole: role //this state is unnecessary for HOC to work
            }
        }

        //call checkUserRole(), wait for promise resolution, then setState here to render comp
        componentDidMount() {

            this.checkUserRole().then((reslt) => {
                
                this.setState({actualRole: reslt})
            
            }, (error) => {
                
                alert(error)
            
            })
            
        }

        //prevent memory leaks once component unmounts
        componentWillUnmount() {
            this.listener();
        }

        //extract claims from current user idToken
        checkUserRole = () => {

            return new Promise((resolve, reject) => {
                
                //check if a user is logged in and proceed to extract claims
                this.listener = this.props.firebase.auth.onAuthStateChanged(
                    authUser => {

                        if(!authUser) {
                            
                            //if authUser is null then redirect to login route
                            this.props.history.push('/login');
                            reject("Unauthorised Access. Please login")
                        }
                        else {
                            //extract claims from IdToken
                            authUser.getIdTokenResult()
                                .then((result) => {

                                    //check if user possesses the claim provided by the input component
                                    if(result.claims[role]){

                                        //if true resolve promise
                                        var reslt = result.claims[role]  
                                        resolve(reslt) 
                                
                                    // otherwise reject promise and prompt alert
                                    } else {
                                        reject("Unauthorised Access")   
                                    }
                                })
                        }

                    }
                )
            })

        }

        render() {
            
            //prevent component rendering until compDidMount() has set state to true
            if (this.state.actualRole === null) return null;
            
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                            <Component {...this.props} user={authUser}/>
                    }
                </AuthUserContext.Consumer>
            )
        }
    }

    return compose(
        withRouter,
        withFirebase,
    )(WithAuthz)

}

export default withAuthz;
