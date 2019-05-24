import React, { Component } from 'react';
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      constructor(props) {
        super(props);
        this.state = {
          activeItem: this.props.activeItem,
        };
      }
      handleChange = e => {
        let { name, value } = e.target;

        let activeItem = { ...this.state.activeItem};
        if (name == "last_name")
          activeItem.user.last_name = value;
        else if (name == "first_name")
           activeItem.user.first_name = value;
         else if (name == "email")
           activeItem.user.email = value;
        else if (name == "username")
          activeItem.user.username = value;
        else if (name == "fatherName")
          activeItem.fatherName = value;
        else if (name == "phone_number")
          activeItem.phone_number = value;

        this.setState({ activeItem });
      };

      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}> Пользователь </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="title">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    defaultValue={this.state.activeItem.user.username}
                    onChange={this.handleChange}
                    placeholder="Введите username"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">Имя</Label>
                  <Input
                    type="text"
                    name="first_name"
                    defaultValue={this.state.activeItem.user.first_name}
                    onChange={this.handleChange}
                    placeholder="Введите имя"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">Фамилия</Label>
                  <Input
                    type="text"
                    name="last_name"
                    defaultValue={this.state.activeItem.user.last_name}
                    onChange={this.handleChange}
                    placeholder="Введите фамилию"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">Отчество</Label>
                  <Input
                    type="text"
                    name="fatherName"
                    defaultValue={this.state.activeItem.fatherName}
                    onChange={this.handleChange}
                    placeholder="Введите отчество"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">email</Label>
                  <Input
                    type="text"
                    name="email"
                    defaultValue={this.state.activeItem.user.email}
                    onChange={this.handleChange}
                    placeholder="Введите email"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="title">Телефон</Label>
                  <Input
                    type="text"
                    name="phone_number"
                    defaultValue={this.state.activeItem.phone_number}
                    onChange={this.handleChange}
                    placeholder="Введите телефон"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Сохранить
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }