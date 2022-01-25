export const DeleteUser = () => {
  const onDelete = () => {
      
  };
  return (
    <button
      className="settings__button button btn--none-border btn--hover-bg-gray-light mr-auto mb-0"
      style={{ backgroundColor: "red" }}
      type="button"
      onClick={onDelete}
    >
      Delete
    </button>
  );
};
