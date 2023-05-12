import { Component } from'react';
import { Navigate } from 'react-router-dom';
import { register } from './api';

export default class Register extends Component {
    constructor(props) {
        super(props);
        
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();
    }

    clearFormData(){
        this.formData = {
            email: '',
            password: ''
        }
    }

    handleEmailChange(e){
        this.formData.email = e.target.value;
    }

    handlePasswordChange(e){
        this.formData.password = e.target.value;
    }

    async handleFormSubmit(e){
        e.preventDefault();
        const result = await register(this.formData.email, this.formData.password);
        if(typeof result !== 'object') console.log(result);
    }

    render() {
        if(this.props.currentUser){
            return <Navigate to="/" replace/>;
        }else{
            return(
                <section>
                    <h1>Регистрация</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className='field'>
                            <label className='label'>Электронная почта</label>
                            <div className='control'>
                                <input type='email' className='input' onChange={this.handleEmailChange}></input>
                            </div>
                        </div>
                        <div className='field'>
                            <label className='label'>Пароль</label>
                            <div className='control'>
                                <input type='password' className='input' onChange={this.handlePasswordChange}></input>
                            </div>
                        </div>
                        <div className='field is-grouped is-is-grouped-right'>
                            <div className='control'>
                                <button className='button is-link is-light' value="Сброс">Сброс</button>
                            </div>
                            <div className='control'>
                                <input type='submit' className='button is-is-primary' value="Регистрироваться"></input>
                            </div>
                        </div>
                    </form>
                </section>
            )
        }
    }
}