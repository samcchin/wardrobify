import React, {useState} from 'react';



function HatsList(props) {
    const [hats, setHats] = useState([]);
    const [hasDeletedSuccessfully, setHasDeletedSuccessfully] = useState(false);

    if (!props.hats || !Array.isArray(props.hats)) {
      return null;
    }

    const deleteHat = async (hatId) => {
        try {
            const response = await fetch(`http://localhost:8090/api/hats/${hatId}`, {
                method: 'DELETE'
            });
            if (response.ok){
                setHats((prevHats) => prevHats.filter((hat)=> hat.id !== hatId));
                setHasDeletedSuccessfully(true)
            }
            else {
                console.error('Unable to delete hat');
            }
        }
        catch (error) {
            console.error('Error', error);
        }
    }
    let messageClasses = 'alert alert-success d-none mb-0';
    let tableClasses = 'table table-striped table-hover';
    if (hasDeletedSuccessfully){
        messageClasses = 'alert alert-success mb-0';
        tableClasses="table table-striped table-hover d-none"
    }

    return (
    <>
        <table className={tableClasses}>
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
        {hasDeletedSuccessfully && (
        <div className={messageClasses} id="success-message">
                You've successfully deleted a hat!
        </div>
    )}
    </>
    );
  }

  export default HatsList
