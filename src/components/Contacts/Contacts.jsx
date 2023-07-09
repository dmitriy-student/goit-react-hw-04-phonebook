import css from './Contacts.module.css';
import PropTypes from 'prop-types';

export const Contacts = ({ contacts, onClick }) => {
  return (
    <ul className={css.contacts_list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.contacts_item} key={id}>
          {name}: {number}
          <button
            className={css.contacts_btn}
            onClick={() => {
              onClick(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
