 function editPersonalDetailsWindowReducer (editSiteDetails, action) {
  const { type, name, value } = action;

  switch (type) {
    case 'edit_personal_details_btn_is_clicked':
      return {...editSiteDetails, toggle: ' show'};
    case 'personalDetails_window_background_is_clicked':
    case 'cancel_personalDetails_window_button_is_clicked':
    case 'websiteDetails_data_is_updated':
      return {toggle: ' hide'};
    case 'add_inputs_values':
      return {...editSiteDetails, toggle: ' show', [name]: value};
    default:
      console.error('Error: unknown type: ', type);
      return {...editSiteDetails};
  }
}

export default editPersonalDetailsWindowReducer;