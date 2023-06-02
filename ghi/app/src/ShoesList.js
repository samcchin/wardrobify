function ShoesList(props){
    return(
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Manufacturer</th>
              <th>Bin</th>
              <th>Color</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
    );

}

export default ShoesList
