import React, {Component} from "react";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
import TodoDetail from "./TodoDetail";
// React Router
import { Route, NavLink, HashRouter, Routes} from "react-router-dom";
// Регистрация нового пользователя
import { getAuth, onAuthStateChanged} from "firebase/auth";
import Register from "./Register";
import firebaseApp from "./firebase";
// авторизация и выход
import Logout from './Logout';
import Login from './Login';

const date1 = new Date(2023, 5, 9, 23, 47);
const date2 = new Date(2023, 5, 10, 0, 47);

const initialData = [
    {
        title: 'Изучить React', // Заголовок дела
        desc: 'Чем быстрее, тем лучше', // Необязательное примечание к делу
        image: '', // картинка в виде data URL
        done: true, // выполнено или нет
        createdAt: date1.toLocaleDateString(), // автоматически заносимые дата и время создания дела
        key: date1.getTime() // уникальный идентификатор дела (кол-во милисекунд от 01.01.1970) заносится автоматически
    },
    {
        title: 'Написать первое React приложение',
        desc: 'Список запланированных дел',
        image: 'https://sun9-21.userapi.com/impf/c637119/v637119755/bfaa/V77IlwhITx4.jpg?size=320x224&quality=96&sign=1d42e5e7dc6aa28453980cea9d1853ee&c_uniq_tag=lWmwPyaYFWexxDsmz87NOGYH53UArk4m6s6GaonlfRs&type=album',
        done: false,
        createdAt: date2.toLocaleDateString(),
        key: date2.getTime()
    }
]

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: initialData,
            showMenu: false,
            currentUser: undefined
        }
        
        this.setDone = this.setDone.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);

        this.showMenu = this.showMenu.bind(this);

        this.getDeed = this.getDeed.bind(this);

        this.authStateChanged = this.authStateChanged.bind(this);
    }

    // вызывается при изменении статуса пользователя
    authStateChanged(user) {
        this.setState({currentUser: user});
    }

    componentDidMount() {
        const auth = getAuth(firebaseApp);
        onAuthStateChanged(auth, this.authStateChanged);
    }
    // Показать меню гамбургер
    showMenu(evt){
        evt.preventDefault();
        this.setState( (state) => ({showMenu:!state.showMenu}));
    }

    // Пометить как выполненное
    setDone(key) {
        const deed = this.state.data.find(item => item.key === key);
        if (deed) {
            deed.done = true;
        }
        this.setState( state => ({}))
    }

    // Удалить как выполненное
    delete(key) {
        const newData = this.state.data.filter( current => current.key!== key );
        this.setState(state => ({data: newData}));
    }

    // Добавить дел
    add(deed){
        this.state.data.push(deed);
        this.setState((state)=>({}));
    }

    // Идентификатор дела
    getDeed(key) {
        key = +key;
        return this.state.data.find(item => item.key === key);
    }

    // isActive - хранит в себе true||false в зависимости, активна ли сейчас ссылка
    render() {
        return(
            <HashRouter>
                <nav className="navbar is-light">
                    <div className="navbar-brand is-uppercase">
                        <NavLink to="/" className={ ({isActive}) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '') }>
                            {this.state.currentUser? this.state.currentUser.email : 'Todos'}
                        </NavLink>
                        <a href="/" className={this.state.showMenu ? 'navbar-burger is-active' : 'navbar-burger'} onClick={this.showMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                    <div className={this.state.showMenu ? 'navbar-menu is-active' : 'navbar-menu'} onClick={this.show}>
                        <div className="navbar-start is-flex is-justify-content-center is-align-content-center">
                            {   
                                this.state.currentUser && 
                                    <NavLink to="/add" className={ ({isActive}) => 'navbar-item block' + (isActive ? 'is-active has-background-primary' : '') }>
                                        Создать дело
                                    </NavLink>
                            }
                            {
                                !this.state.currentUser && (
                                    <NavLink to="/login" className={ ({isActive}) => 'navbar-item block' + (isActive ? 'is-active has-background-primary' : '') }>
                                        Войти
                                    </NavLink>
                                )
                            }
                            {
                                !this.state.currentUser && 
                                <NavLink to="/register" className={ ({isActive}) => 'navbar-item block' + (isActive? 'is-active has-background-primary' : '') }>
                                    Регистрация
                                </NavLink>
                            }
                        </div>

                        {
                            this.state.currentUser && (
                                <div className="navbar-end">
                                    <NavLink to="/logout" className={ ({isActive}) => 'navbar-item block' + (isActive? 'is-active has-background-primary' : '') }>
                                        Выйти
                                    </NavLink>
                                </div>
                            )
                        }
                    </div>
                </nav>
                <main className="content px-6 mt-6">
                    <Routes>
                        <Route path="/" element={<TodoList list={this.state.data} setDone={this.setDone} delete={this.delete} />} />
                        <Route path="/add" element={<TodoAdd add={this.add} />} />
                        <Route path="/:key" element={<TodoDetail getDeed={this.getDeed}/>} />
                        <Route path="/register" element={<Register currentUser={this.state.currentUser} />} />
                        <Route path="/logout" element={<Logout currentUser={this.state.currentUser} />}/>
                        <Route path="/login" element={<Login currentUser={this.state.currentUser} />}/>
                    </Routes>
                </main>
            </HashRouter>
        )
    }
}