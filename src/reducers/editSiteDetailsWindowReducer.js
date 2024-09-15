 function editSiteDetailsWindowReducer (editSiteDetails, action) {
  const { type, name, value } = action;

  switch (type) {
    case 'edit_siteDetails_button_is_clicked':
      return {...editSiteDetails, toggle: ' show'};
    case 'siteDetails_window_background_is_clicked':
    case 'cancel_siteDetails_window_button_is_clicked':
    case 'websiteDetails_data_is_updated':
      return {toggle: ' hide'};
    case 'add_inputs_values':
      return {...editSiteDetails, toggle: ' show', [name]: value};
    default:
      console.error('Error: unknown type: ', type);
      return {...editSiteDetails};
  }
}

export default editSiteDetailsWindowReducer;