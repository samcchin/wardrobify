import React, { useEffect, useState } from "react"

function HatsForm() {
    const [locations, setLocations] = useState([])
    const [style, setStyle] = useState('');
    const [fabric, setFabric] = useState('');
    const [color, setColor] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [location, setLocation] = useState('');

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/locations/'
        const response = await fetch(url);

        if (response.ok){
            const data = await response.json();
            console.log(data)
            setLocations(data.locations);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.style = style;
        data.fabric = fabric;
        data.color = color;
        data.picture_url = pictureUrl;
        data.location = location;


        const hatUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const response = await fetch(hatUrl, fetchConfig);
        if (response.ok) {
          const newHat = await response.json();
          console.log(newHat);

          setStyle('');
          setFabric('');
          setColor('');
          setPictureUrl('');
          setLocation('');
        }
      }

    return (
        <>
          <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Create a new hat</h1>
              <form onSubmit={handleSubmit} id="create-hat-form">
                <div className="form-floating mb-3">
                  <input
                  onChange={handleStyleChange}
                  placeholder="Style name"
                  required value ={style}
                  type="text" name="style_name" id="style_name" className="form-control"/>
                  <label htmlFor="style_name">Style Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                  onChange={handleFabricChange}
                  placeholder="Fabric"
                  required value ={fabric}
                  type="text" name="fabric" id="fabric" className="form-control"/>
                  <label htmlFor="fabric">Fabric</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                  onChange={handleColorChange}
                  placeholder="Color"
                  value={color}
                  type="text" name="color" id="color" className="form-control"/>
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input onChange={handlePictureUrlChange}
                  placeholder="Picture URL"
                  required value={pictureUrl}
                  type="text" name="pictureUrl" id="pictureUrl" className="form-control"/>
                  <label htmlFor="pictureUrl">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select
                    onChange={handleLocationChange}
                    required
                    value={location}
                    name="location"
                    id="location"
                    className="form-select">
                    <option value="">Choose a location</option>
                    {locations.map((location)=>{
                      return (
                          <option key={location.href} value={location.href}>
                              {location.closet_name}
                          </option>
                      )
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
        </>
        );

}


export default HatsForm;
