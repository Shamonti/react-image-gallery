import PropTypes from 'prop-types';

function Checkbox({ item, handleSelect }) {
  return (
    <input
      type='checkbox'
      value={item.id}
      className='checkbox'
      onChange={() => handleSelect(item.id)}
      checked={item.checked || false}
    />
  );
}

Checkbox.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool,
  }).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default Checkbox;
