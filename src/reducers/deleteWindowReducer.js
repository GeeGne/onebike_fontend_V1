function deleteWindowReducer (deleteWindow, action) {
  const { type, productId, index } = action;

  switch (type) {
    case 'delete_button_is_clicked':
      return {toggle: ' show', productId, index};
    case 'cancel_window_button_is_clicked':
      return {toggle: ' hide', productId: "", index: ""};
    case 'delete_window_button_is_clicked':
      return {toggle: ' hide', productId: "", index: ""};
    default:
      return;
  }
}

export default deleteWindowReducer;