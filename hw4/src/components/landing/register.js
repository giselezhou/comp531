
import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {register} from '../userActions'
import ErrorDiv from '../utils/error'

export const Register=({regError, registerValidate})=>{
    let birthday, username, psw, pswConfirm, phone, zipcode, email
    return(
        <div>
            <div className="panel panel-default ">
                <div className="panel-heading"><h2 className="panel-title">Register</h2></div>
                <div className="panel-body">
                    {regError.errorMsg? <ErrorDiv errorMsg={regError.errorMsg}/>:null}
                    <form method="GET" action="index.html">
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text" className="form-control" id="name" placeholder="Name" ref={(node)=> username=node} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Display Name</label>
                            <input type="text" className="form-control" id="displayName" placeholder="Name"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Email</label>
                            <input type="email" className="form-control" id="email" ref={(node)=>email=node} placeholder="Email" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>PhoneNumber</label>
                            <input type="text" className="form-control" id="phone" ref={(node)=>phone=node} placeholder="100-100-1000" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Zip</label>
                            <input type="text" className="form-control" id="zipcode" ref={(node)=>zipcode=node} placeholder="77005" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Birthday</label>
                            <input type="date" className="form-control" id="birthday" ref={(node)=>birthday=node} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>password</label>
                            <input type="password" className="form-control" id="password" ref={(node)=>psw=node} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label>password confirmation</label>
                            <input type="password" className="form-control" id="passwordConfirm" ref={(node)=>pswConfirm=node} required/>
                        </div>
                        <button type="submit" className="btn btn-primary col-md-12" onClick={(e)=>{
                            e.preventDefault()
                            registerValidate(birthday.value, username.value, psw.value, pswConfirm.value,phone.value, zipcode.value, email.value)
                        }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}



export default connect((state)=>{

    return{
        regError: state.ErrorReducer.regError
    }
},(dispatch)=>{
    return{
        registerValidate: (birthday, username, psw, pswConfirm, phone, zipcode, email)=>register(birthday,
            username, psw, pswConfirm,phone, zipcode,email)(dispatch)
    }
})(Register)