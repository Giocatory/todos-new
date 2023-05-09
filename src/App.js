import React, {Component} from "react";
import TodoList from "./TodoList";

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
        
        this.data = initialData;
    }

    render() {
        return(
            <>
                <nav className="navbar is-light">
                    <div className="navbar-brand">
                        <span className="navbar-item is-uppercase">
                            Todos
                        </span>
                    </div>
                </nav>
                <main className="content px-6 mt-6">
                    <TodoList list={this.data}/>
                </main>
            </>
        )
    }
}