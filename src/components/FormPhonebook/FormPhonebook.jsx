import { useState } from 'react';
import css from './FormPhonebook.module.css';
import { nanoid } from 'nanoid';

export default function FormPhonebook({ formSubmit }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = e => {
    const { name, value } = e.currentTarget;
    setId(nanoid());
    if (name === 'name') {
      return setName(value);
    }
    if (name === 'number') {
      return setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    formSubmit({ id, name, number });
    resetForm();
  };

  const resetForm = () => {
    setId('');
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form_container} onSubmit={handleSubmit}>
      <label className={css.form_label}>
        Name
        <input
          className={css.form_input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleInput}
          required
        />
      </label>
      <label className={css.form_label}>
        Number
        <input
          className={css.form_input}
          type="tel"
          name="number"
          value={number}
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleInput}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}
