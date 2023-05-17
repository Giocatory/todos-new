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
        // validation
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);

        this.state = {
            errorEmail: '',
            errorPassword: '',
            errorPasswordConfirm: '',
        }   
    }

    // validation
    resetErrorMessages(){
        this.setState( (state) => ({
            errorEmail: '',
            errorPassword: '',
            errorPasswordConfirm: '',
        }))
    }

    validate(){
        this.resetErrorMessages();
        if(!this.formData.email){
            this.setState({ errorEmail: 'Адрес эелектронной почты указан не верно!'});
            return false;
        }
        if(!this.formData.password){
            this.setState({ errorPassword: 'Пароль указан не верно!'});
            return false;
        }
        if(!this.formData.passwordConfirm){
            this.setState({ errorPasswordConfirm: 'Подтверждение пароля'});
            return false;
        }
        if(this.formData.password!== this.formData.passwordConfirm){
            this.setState({ 
                errorPassword: 'Пароли не совпадают',
                errorPasswordConfirm: 'Пароли не совпадают'
            });
            return false;
        }
        return true;
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

    handlePasswordConfirmChange(e){
        this.formData.passwordConfirm = e.target.value;
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
                            {
                                this.state.errorEmail &&
                                <p className='help is-danger'>{this.state.errorEmail}</p>
                            }
                        </div>
                        <div className='field'>
                            <label className='label'>Пароль</label>
                            <div className='control'>
                                <input type='password' className='input' onChange={this.handlePasswordChange}></input>
                            </div>
                            {
                                this.state.errorPassword &&
                                <p className='help is-danger'>{this.state.errorPassword}</p>
                            }
                        </div>
                        <div className='field'>
                            <label className='label'>Повторите пароль</label>
                            <div className='control'>
                                <input type='password' className='input' onChange={this.handlePasswordConfirmChange}></input>
                            </div>
                            {
                                this.state.errorPasswordConfirm &&
                                <p className='help is-danger'>{this.state.errorPasswordConfirm}</p>
                            }
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