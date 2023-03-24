import DataHandler from "./DataHandler";
import { connect } from "react-redux";
import { Component } from "react";

export class APIHandler extends Component{

    static getHeaderNoToken(api_name) {

        return {'Content-Type': 'application/json'};
    }
    static getHeaderWithPasswordAuth() {

        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${btoa(`${DataHandler.getFromSession('username')}:${DataHandler.getFromSession('password')}`)}`
        };
    }

}