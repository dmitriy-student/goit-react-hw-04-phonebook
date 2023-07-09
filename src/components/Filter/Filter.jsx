import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filter_label}>
      Filter contacs by name
      <input
        className={css.filter_input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
