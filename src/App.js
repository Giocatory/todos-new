import React, {Component} from "react";
import TodoList from "./TodoList";
import TodoAdd from "./TodoAdd";
// React Router
import { Route, NavLink, HashRouter, Routes} from "react-router-dom";

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
        image: '',
        done: false,
        createdAt: date2.toLocaleDateString(),
        key: date2.getTime()
    }
]

export default class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: initialData
        }
        
        this.setDone = this.setDone.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
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

    // isActive - хранит в себе true||false в зависимости, активна ли сейчас ссылка
    render() {
        return(
            <HashRouter>
                <nav className="navbar is-light">
                    <div className="navbar-brand">
                        <NavLink to="/" className={ ({isActive}) => 'navbar-item is-uppercase' + (isActive ? 'is-active' : '') }>
                            Todos
                        </NavLink>
                    </div>
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <NavLink to="/add" className={ ({isActive}) => 'navbar-item' + (isActive ? 'is-active' : '') }>
                                Создать дело
                            </NavLink>
                        </div>
                    </div>
                </nav>
                <main className="content px-6 mt-6">
                    <Routes>
                        <Route path="/" element={<TodoList list={this.state.data} setDone={this.setDone} delete={this.delete} />} />
                        <Route path="/add" element={<TodoAdd add={this.add} />} />
                    </Routes>
                </main>
            </HashRouter>
        )
    }
}