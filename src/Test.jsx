// Test Component is mainly for testing fonts, global settings etc
import React, {useRef, useState, useEffect} from 'react';
// import './Styles/Test.scss';

// import products from '/src/Data/products.json';


function Test  () {
  const mainContainer = useRef(null);
  const container = useRef(null);
  const [scrollDepth, setScrollDepth] = useState(0);

  const handleClick = (e) => {
    console.log(e)

  }

  const products = [{
    id: 0,
    category: "accessories",
    type: "lights",
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/img/products/NiteRider Lumina 1200.jpg",
    color: "black",
    brand: "NiteRider"
  },{
    id: 1,
    category: "accessories",
    type: "Bike Pumps",
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg",
    color: "Grey",
    brand: "GIYO"
  },{
    id: 2,
    category: "clothes",
    type: "lights",
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/img/products/NiteRider Lumina 1200.jpg",
    color: "black",
    brand: "NiteRider"
  },{
    id: 3,
    category: "parts",
    type: "Bike Pumps",
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg",
    color: "Grey",
    brand: "GIYO"
  },{
    id: 4,
    category: "parts",
    type: "lights",
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/img/products/NiteRider Lumina 1200.jpg",
    color: "black",
    brand: "NiteRider"
  },{
    id: 5,
    category: "kids",
    type: "Bike Pumps",
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg",
    color: "Grey",
    brand: "GIYO"
  },{
    id: 6,
    category: "clothing",
    type: "lights",
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/img/products/NiteRider Lumina 1200.jpg",
    color: "black",
    brand: "NiteRider"
  },{
    id: 7,
    category: "kids",
    type: "Bike Pumps",
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg",
    color: "Grey",
    brand: "GIYO"
  },{
    id: 8,
    category: "clothing",
    type: "lights",
    title: "NiteRider Lumina 1200 Boost USB Rechargeable Bike Light Powerful Lumens Bicycle Headlight LED Front Light Easy to Install for Men Women Road Mountain City Commuting Adventure Cycling Safety Flashlight",
    img: "src/assets/img/products/NiteRider Lumina 1200.jpg",
    color: "black",
    brand: "NiteRider"
  },{
    id: 9,
    category: "parts",
    type: "Bike Pumps",
    title: "GIYO Small Bike tire Pump Schrader & Presta Valve for MTB 80 PSI Telescopic Barrel All Metal CNC Portable Mini Bike Pump Secure Valve Lock for Easy Pumping | Taiwan Made GM043",
    img: "src/assets/img/products/GIYO Small Bike tire Pump Schrader.jpg",
    color: "Grey",
    brand: "GIYO"
  }]

  useEffect(() => {
    console.log(products);
    let matchedItems = [];
    const newArray = products.map(product => product.category);
    newArray.forEach(product => {
      let matchedItem;
      matchedItems.forEach(item => item === product && (matchedItem = true));
      matchedItem || (matchedItems = [...matchedItems, product]);
    })

    console.log(matchedItems);
  }, []);

  return (
    // <>
    //   <input placeholder="This is Input"/>
    //   <h1>This is H1</h1>
    //   <h2>This is H2</h2>
    //   <h3>This is H3</h3>
    //   <button onClick={handleClick}>Light Theme / Dark Theme</button>
    // </>
    <>
      <ul className="container" ref={mainContainer}>
        <li className="blue-container" ref={container}><img src={img1}/></li>
        <li className="green-container"><img src={img2}/></li>
        <li className="blue-container"><img src={img3}/></li>
        <li className="blue-container" ref={container}><img src={img1}/></li>
        <li className="green-container"><img src={img2}/></li>
        <li className="blue-container"><img src={img3}/></li>
      </ul>
      <button onClick={() => setScrollDepth(oldVal => (oldVal - container.current.scrollWidth))}>left</button>
      <button onClick={() => setScrollDepth(oldVal => (oldVal + container.current.scrollWidth))}>right</button>
    </>
  )
}

export default Test;