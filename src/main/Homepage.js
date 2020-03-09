import React, { Fragment } from "react";
import { connect } from "react-redux";
import "../css/homepage.css";
import Header from "../components/common/header";
import Footer from "../components/common/footer";
import Information from "../components/homepage/information";
import Tool from "../components/homepage/tool";
import { Guest, Member } from "../components/homepage/authBtn";

class Homepage extends React.Component{

    render(){   
        return(
            <Fragment>        
                <div className="homepageContainer">
                    <Header/>            
                    <div className="bubbleContainer ">
                        <div className="underContainer bubble " ></div>
                        <div className="contentContainer ">
                            <div className="slogan">Making Language Fun and Easy !</div>
                            <div className="authBtn">     
                                { this.props.auth.uid? <Member/> : <Guest/> }               
                            </div>
                        </div> 
                    </div>  
                </div>
                <Information/>  
                <div className="toolContainer">        
                    <Tool/>
                </div>
                <Footer/>  
            </Fragment>          
        )
    }
}

const mapStateToProps = ( state ) =>{
    return{
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(Homepage)