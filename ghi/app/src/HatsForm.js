import React, { useEffect, useState } from "react"

function HatsForm({ getHats }) {
    const [style, setStyle ] = useState('');
    const [ fabric, setFabric ] = useState('');
    const [ color, setColor ] = useState('');
    const [ pictureUrl, setPictureUrl ] = useState('');
    const [ location, setLocation ] = useState('');

    useEffect(() => {
        async function getLocations() {
          const url = 'http://localhost:8090/api/locations/';

          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
          }
        }
        getLocations();
    }, [])

    const handleStyleChange = (event) => {
        const value = event.target.value;
        setStyle(value)
    }

    const handleFabricChange = (event) => {
        const value = event.target.value;
        setFabric(value)
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value)
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value;
        setPictureUrl(value)
    }

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            style_name: style,
            fabric,
            color,
            picture_url: pictureUrl,
        };

        const locationUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
          const newHat = await response.json();
          console.log(newHat);
          getHats()


          setStyle('');
          setFabric('');
          setColor('');
          setPictureUrl('');
          setLocation('');
        }
      }

    // return (

    // )

}


export default HatsForm;
