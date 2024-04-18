// Test Component is mainly for testing fonts, global settings etc
import './Styles/Test.scss';

function Test  () {
  
  const handleClick = () => {
    document.body.classList.toggle('dark-theme');
  }

  return (
    <>
      <input placeholder="This is Input"/>
      <h1>This is H1</h1>
      <h2>This is H2</h2>
      <h3>This is H3</h3>
      <button onClick={handleClick}>Light Theme / Dark Theme</button>
    </>
  )
}

export default Test;