import React, { useState } from 'react';

function ShoesList(props){
    const [shoes, setShoes] = useState([]);
    const [hasDeletedSuccessfully, setHasDeletedSuccessfully] = useState(false);

    const deleteShoes = async (shoeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/shoes/${shoeId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setShoes((prevShoes) => prevShoes.filter((shoe) => shoe.id !== shoeId));
                setHasDeletedSuccessfully(true)
                window.location.reload()
            }
            else {
                console.error("Unable to delete shoes");
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }
    let messageClasses = 'alert alert-success d-none mb-0';
    let tableClasses = 'table table-striped table-hover';
    if (hasDeletedSuccessfully){
        messageClasses = 'alert alert-success mb-0';
        tableClasses="table table-striped table-hover d-none"
    }


    return(
        <>
        <table className={tableClasses}>
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Manufacturer</th>
              <th>Bin</th>
              <th>Color</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {props.shoes.map(shoe => {
              return (
                <tr key={ shoe.model_name }>
                  <td>{ shoe.model_name }</td>
                  <td>{ shoe.manufacturer }</td>
                  <td>{ shoe.bin.closet_name } - { shoe.bin.bin_number } / { shoe.bin.bin_size }</td>
                  <td>{ shoe.color }</td>
                  <td>
                    <button onClick={()=>deleteShoes(shoe.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {hasDeletedSuccessfully && (
            <div className={messageClasses} id="success-message">
                    You've successfully deleted shoes!
            </div>
        )}
        </>
    );

}

export default ShoesList
