import React, {Component} from "react";

export default class TodoAdd extends Component {
    constructor(props) {
        super(props);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.clearFormData();        
    }
    
    clearFormData() {
        this.formData = {
            title: '',
            desc: '',
            image: ''
        }
    }

    handleTitleChange(event) {
        this.formData.title = event.target.value;
    }

    handleDescChange(event) {
        this.formData.desc = event.target.value;
    }

    handleImageChange(event) {
        const cFiles = event.target.files;

        if (cFiles.length > 0) {
            const fileReader = new FileReader();
            const that = this;
            fileReader.onload = () => {
                that.formData.image = fileReader.result;
            }
            fileReader.readAsDataURL(cFiles[0]);
        } else{
            this.formData.image = '';
        }
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const newDeed = {...this.formData};
        const date = new Date();
        newDeed.done = false;
        newDeed.createdAt = date.toLocaleString();
        newDeed.key = date.getTime();
        this.props.add(newDeed);
        this.clearFormData();
        event.target.reset();
    }
    
    render() {
        return (
            <section>
                <h1>Создание нового дела</h1>
                <form onSubmit={this.handleFormSubmit}>
                    
                    <div className="field">
                        <label className="label">Заголовок</label>
                        <div className="control">
                            <input className="input" onChange={this.handleTitleChange}></input>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Примечание</label>
                        <div className="control">
                            <textarea className="textarea" onChange={this.handleDescChange}></textarea>
                        </div>
                    </div>


                    <div className="field">
                        <div className="file">
                            <label className="file-label">
                                <input className="file-input" type="file" accept="image/*" onChange={this.handleImageChange}></input>
                                <span className="file-cta">
                                    <span className="file-label">Графическая иллюстрация...</span>
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-right">
                        <div className="control">
                            <input type="reset" className="button is-link is-light" value="Сброс"></input>
                        </div>
                        <div className="control">
                            <input type="submit" className="button is-primary" value="Создать дело"></input>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}