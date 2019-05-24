import React, { Component } from 'react';
import Modal from "./components/Modal";
import axios from "axios";

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          modal: false,
          activeItem: {
            user:{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
            },
            fatherName: "",
            phone_number: "",
          },
          userList: []
        };
      }

      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/profiles/")
          .then(res => this.setState({ userList: res.data }))
          .catch(err => console.log(err));
      };


      renderItems = () => {
        const newUsers = this.state.userList
        return newUsers.map(item => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{item.user.username}</span>
            <span>{item.user.first_name}</span>
            <span>{item.user.last_name}</span>
            <span>{item.fatherName}</span>
            <span>{item.user.email}</span>
            <span>{item.phone_number}</span>

            <span>
              <button
                onClick={() => this.editUser(item)}
                className="btn btn-secondary mr-2"
              >
                Изменть
              </button>
              <button
                onClick={() => this.handleDelete(item)}
                className="btn btn-danger"
              >
                Удалить
              </button>
            </span>
          </li>
        ));
      };

      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          // alert("save" + JSON.stringify(item));


          axios
            .put(`http://localhost:8000/api/profiles/${item.id}/`, item)
            .then(res => this.refreshList())
            .catch(err => {
               console.log('caught it!',err);
            })
          return;
        }
        axios
          .post("http://localhost:8000/api/profiles/", item)
          .then(res => this.refreshList());
      };
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/profiles/${item.id}`)
          .then(res => this.refreshList());
      };
      createUser = () => {

        const item = { user:{username: "", first_name: "", last_name: "", email: "",}, fatherName: "", phone_number: "", password:"admin" };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editUser = item => {
        // alert("save" + JSON.stringify(item));
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      render() {
        return (
          <main className="content">
            <h2 className="text-white text-uppercase text-center my-4">Список пользоветлей</h2>
            <div className="row ">
              <div className="col-md-10 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  <div className="">
                    <button onClick={this.createUser} className="btn btn-primary">
                      Добиваить пользователя
                    </button>
                  </div>
                  <ul className="list-group list-group-flush">
                    {this.renderItems()}
                  </ul>
                </div>
              </div>
            </div>

            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }


    export default App;
