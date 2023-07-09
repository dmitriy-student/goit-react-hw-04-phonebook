import React, { Component } from 'react';
import css from './App.module.css';
import { Section } from 'components/Section/Section';
import { FormPhonebook } from 'components/FormPhonebook/FormPhonebook';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(':>> update');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmit = data => {
    const { contacts } = this.state;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      return alert(`${data.name} is already in contacts.`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  changeFilter = e => {
    const { value } = e.currentTarget;
    this.setState({
      filter: value,
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filtredNumbers = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Section>
          <FormPhonebook formSubmit={this.formSubmit}></FormPhonebook>
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter}></Filter>
          <Contacts contacts={filtredNumbers} onClick={this.deleteContact} />
        </Section>
      </div>
    );
  }
}

export default App;
