import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './FormPhonebook.module.css';
import { nanoid } from 'nanoid';

export class FormPhonebook extends Component {
  state = {
    id: '',
    name: '',
    number: '',
  };

  static propTypes = { formSubmit: PropTypes.func.isRequired };

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      id: nanoid(),
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.formSubmit(this.state);
    this.resetForm();
    // this.state
  };

  resetForm = () => {
    this.setState({
      id: '',
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form className={css.form_container} onSubmit={this.handleSubmit}>
        <label className={css.form_label}>
          Name
          <input
            className={css.form_input}
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.handleInput}
            required
          />
        </label>
        <label className={css.form_label}>
          Number
          <input
            className={css.form_input}
            type="tel"
            name="number"
            value={this.state.number}
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            onChange={this.handleInput}
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
