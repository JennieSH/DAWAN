import React, {Fragment} from "react";
import { connect } from "react-redux";

import {  firestoreConnect } from "react-redux-firebase"; // r
import { compose } from "redux";

class  Dictionary extends React.Component{

    constructor(props){
        super(props);
        this.state={
           chinese:""
        }
    }
    handleChange(e){
        this.setState({
            chinese: e.currentTarget.value
        })
  
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createData(this.state)    
    }

    getDic(){
            
        fetch(`https://www.moedict.tw/a/${this.state.chinese}.json`,{
                    method: 'GET',
                }).then(function(response) {
                    
                        return response.json()
                    
                }).then((res)=>{
                     this.setState({
                        ...this.state,
                        english:res.English,
                        pinyin:res.h[0].p,
                        zhuyin:res.h[0].b
                        })                   
                }).then(()=>{
                    console.log("get dic")
                }).catch(function(err) {
                    console.log("fetch dic err"+err)
                })
        
    }


    getImg(){
        let url =
                `https://api.unsplash.com/search/photos/?client_id=9c89b71b1f64592d8c158c4e09c3b76207d2c066b97cb231396dbff515e7aec7&per_page=1&query=${this.state.english}`;

                fetch(url, {method: 'get'})
                .then(function(response) {
                    return response.json()
                }).then((res)=>{                
                    this.setState({
                        ...this.state,
                    imgs: res.results[0].urls.small
                    })
                }).then(()=>{
                    console.log("get img")
                }).catch(function(err) {
                    console.log("fetch img err"+err)
                })   
    }

    getAudio(){
        let apiKey = "AIzaSyD-I8KgXlOZVldg8tK77bL-jpfcL6GKKZ4";
            let ttssrc = `https://texttospeech.googleapis.com/v1beta1/text:synthesize?key=${apiKey}`;
                    fetch( ttssrc , {
                        method: 'POST',
                        body: JSON.stringify({
                            "audioConfig": {
                            "audioEncoding": "MP3",
                            "pitch": 0,
                            "speakingRate": 1
                            },
                            "input": {
                            "text": `${this.state.chinese}`
                            },
                            "voice": {
                            "languageCode": "en-US",
                            "name": "en-US-Standard-B"
                            }            
                        }),                    
                    }).then(function(response) {
                            return response.json()      
                    }).then((res)=>{
                        
                        this.setState({
                            ...this.state,
                            audio:res.audioContent
                         })
         
                    }).then(()=>{
                        console.log("get audio")
                    }).catch((err)=>{
                        console.log("tts API err"+err)
                    })   
    }

    send(){
        let cityArr =[{id:"TW-NWT"},{id:"TW-HUA"},{id:"TW-KEE"},{id:"TW-TPE"},{id:"TW-TAO"},{id:"TW-HSZ"},
        {id:"TW-HSQ"},{id:"TW-MIA"},{id:"TW-ILA"},{id:"TW-TXG"},{id:"TW-CHA"},{id:"TW-YUN"},
        {id:"TW-CYI"},{id:"TW-CYQ"},{id:"TW-TNN"},{id:"TW-PIF"},{id:"TW-KHH"},{id:"TW-TTT"},{id:"TW-NAN"}]
        // this.props.createData(cityArr)    

    }


    render(){
       
        return(
            <Fragment>
                <button onClick={ this.getDic.bind(this)}>dic</button>
                <button onClick={ this.getImg.bind(this)}>img</button>
                <button onClick={ this.getAudio.bind(this)}>audio</button>
                <form onSubmit={ this.handleSubmit.bind(this) }>
                        <input type="text" value={this.state.title} onChange={this.handleChange.bind(this)}  id="base64"/>
                        <input type="submit" value="Submit"/>
                        
                </form>  
                {/* <button onClick={ this.send.bind(this)}>data</button> */}
            </Fragment> 
        )
    }
}

// export default Dictionary
export default Dictionary