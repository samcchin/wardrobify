function HatsList(props) {
    if (!props.hats || !Array.isArray(props.hats)) {
      return null;
    }
    // console.log(props)
    return (
    <>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
            <th>Hats</th>
            <th>Location</th>
            </tr>
        </thead>
        <tbody>
            {props.hats.map((hat) => {
            return (
                <tr key={hat.href_import}>
                <td>{hat.style_name}</td>
                <td>{hat.location}</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    </>
    );
  }

  export default HatsList;
