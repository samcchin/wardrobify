import React, {useState} from 'react';



function HatsList(props) {
    const [hats, setHats] = useState('');

    if (!props.hats || !Array.isArray(props.hats)) {
      return null;
    }

    const deleteHat = async (hatId) => {
        try {
            const response = await fetch(`/api/hats/${hatId}`, {
                method: 'DELETE'
            });
            if (response.ok){
                setHats((prevHats) => prevHats.filter((hat)=> hat.id !== hatId));
            }
            else {
                console.error('Unable to delete hat');
            }
        }
        catch (error) {
            console.error('Error', error);
        }
    }

    return (
    <>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
            <th>Hats</th>
            <th>Fabric</th>
            <th>Color</th>
            <th>Picture URL</th>
            <th>Location</th>
            <th>Delete Hat</th>
            </tr>
        </thead>
        <tbody>
            {props.hats.map((hat) => {
            return (
                <tr key={hat.id}>
                <td>{hat.style_name}</td>
                <td>{hat.fabric}</td>
                <td>{hat.color}</td>
                <td>{hat.picture_url}</td>
                <td>{hat.location.closet_name}</td>
                <td>
                    <button onClick={()=>deleteHat(hat.id)}>Delete</button>
                </td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>
    )
  }

  export default HatsList
