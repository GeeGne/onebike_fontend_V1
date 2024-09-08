 function editAltWindowReducer (editAltWindow, action) {
  const { type, alt, id } = action;

  switch (type) {
    case 'edit_alt_button_is_clicked':
      return {...editAltWindow, toggle: ' show', id};
    case 'window_background_is_clicked':
    case 'cancel_window_button_is_clicked':
    case 'alt_data_is_updated':
      return {toggle: ' hide', alt: "", id: ''};
    case 'add_alt_data':
      return {...editAltWindow, alt};
    default:
      console.error('Error: unknown type: ', type);
      return {...editAltWindow};
  }
}

export default editAltWindowReducer;