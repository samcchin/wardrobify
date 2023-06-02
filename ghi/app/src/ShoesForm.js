import React, { useEffect, useState } from 'react';

function ShoesForm(){

    const [bins, setBins] = useState([]);
    const [bin, setBin] = useState([]);
    const [modelName, setModelName] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [color, setColor] = useState("");
    const [pictureURL, setPictureURL] = useState("");

    const handleBinChange = (event) => {
        const value = event.target.value;
        setBin(value);
    }

    const handleModelNameChange = (event) => {
        const value = event.target.value;
        setModelName(value);
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }

    const handlePicureURLChange = (event) => {
        const value = event.target.value;
        setPictureURL(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formdata = {};

        formdata.modelName = modelName;
        formdata.bin = bin;
        formdata.manufacturer = manufacturer;
        formdata.color = color;
        formdata.pictureURL = pictureURL;


        const shoeUrl = `http://localhost:8080/api/shoes/`;
        const fetchConfig = {
          method: "post",
          body: JSON.stringify(formdata),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const response = await fetch(shoeUrl, fetchConfig);
        if (response.ok) {
          const newShoes = await response.json();
          console.log(newShoes);

          setBin('');
          setModelName('');
          setManufacturer('');
          setColor('');
          setPictureURL('');
        }
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins/';
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setBins(data.bins)

            }
        }
        useEffect(() => {
            fetchData();
          }, []);

    return(
        <form onSubmit={handleSubmit} id="add-shoes-form">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add new shoes</h1>
                        <div className="form-floating mb-3">
                            <input onChange={handleModelNameChange} value={modelName} placeholder="Model name" required type="text" name="model_name" id="model_name" className="form-control" />
                            <label htmlFor="model_name">Model name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePicureURLChange} value={pictureURL} placeholder="Picture URL" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture URL</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleManufacturerChange} value={manufacturer} placeholder="Manufacturer" type="text" name="manufacturer" id="manufacturer" className="form-control" />
                            <label htmlFor="manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleBinChange} required name="bin" id="bin" className="form-select">
                            <option value="">Choose a Bin</option>
                            {bins.map(bin => {
                                        return (
                                            <option value={bin.id} key={bin.href}>
                                                {bin.closet_name}
                                            </option>
                                        )
                                    })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </form>
    )

}

export default ShoesForm
