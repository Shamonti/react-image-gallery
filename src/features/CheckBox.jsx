import PropTypes from 'prop-types';

function Checkbox({ item, handleSelect }) {
  return (
    <div className="absolute left-0 top-0 flex h-0 w-full bg-neutral-900 opacity-0 duration-500 group-hover:h-full group-hover:opacity-100">
      <input
        type="checkbox"
        value={item.id}
        className="h-8"
        onChange={() => handleSelect(item.id)}
        checked={item.checked || false}
      />
    </div>
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
