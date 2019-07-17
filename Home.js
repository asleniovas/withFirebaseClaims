import React from "react";

//import the authorization HOC
import {withAuthz} from "../Session";

class Home extends React.Component {
    
    render() {
        
        return(
            
        
            <h1>Protected content</h1>
          
        
        )
    }
}

//define the custom claim a user must possess 
const role = "admin";

//pass this component and role to HOC and export
export default withAuthz(role)(Home);
