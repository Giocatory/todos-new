import { Component } from'react';
import { Navigate } from 'react-router-dom';
import { login } from './api';

export default class Login extends Component {
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
        await login(this.formData.email, this.formData.password)
    }

    render() {
        if (this.props.currentUser)
          return <Navigate to="/" replace />;
        else
          return (
            <section>
              <h1>Вход</h1>
              <form onSubmit={this.handleFormSubmit}>
                <div className="field">
                  <label className="label">Адрес электронной почты</label>
                  <div className="control">
                    <input type="email" className="input"
                           onBlur={this.handleEmailBlur} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Пароль</label>
                  <div className="control">
                    <input type="password" className="input"
                           onBlur={this.handlePasswordBlur} />
                  </div>
                </div>
                <div className="field is-grouped is-grouped-right">
                  <div className="control">
                    <input type="reset"
                           className="button is-link is-light"
                           value="Сброс" />
                  </div>
                  <div className="control">
                    <input type="submit" className="button is-primary"
                           value="Войти" />
                  </div>
                </div>
              </form>
            </section>
        )
    }
}