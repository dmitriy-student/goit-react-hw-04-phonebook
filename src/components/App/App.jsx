import { useState, useEffect } from 'react';
import css from './App.module.css';
import { Section } from 'components/Section/Section';
import FormPhonebook from 'components/FormPhonebook/FormPhonebook';
import { Contacts } from 'components/Contacts/Contacts';
import { Filter } from 'components/Filter/Filter';

export default function App(params) {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      const contactsLs = JSON.parse(localStorage.getItem('contacts'));
      if (contactsLs) {
        setContacts(contactsLs);
      }
      setFirstRender(false);
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      return alert(`${data.name} is already in contacts.`);
    }
    setContacts(prev => [...prev, data]);
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  // const deleteContact = id => {
  //   setContacts(prev => {
  //     prev.filter(contact => contact.id !== id);
  //   });
  // };

  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  const filtredNumbers = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Section>
        <FormPhonebook formSubmit={formSubmit}></FormPhonebook>
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter}></Filter>
        <Contacts contacts={filtredNumbers} onClick={deleteContact} />
      </Section>
    </div>
  );
}
