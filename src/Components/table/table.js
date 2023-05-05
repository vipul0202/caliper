import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Table({ onEditClick }) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const vehicleList = useSelector((state) => state.vehicleList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(vehicleList, 'vehicleList');
  }, [vehicleList]);

  const handleEdit = (id) => {
    dispatch({
      type: 'UPDATE_VEHICLE_ID',
      payload: { activeVehicleID: id, activeVehicle: vehicleList[id] },
    });
    onEditClick();
  };

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_VEHICLE', payload: { activeVehicleID: id } });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // toggle sort direction
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // set new sort column and direction
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortedList = Object.keys(vehicleList)
    .filter((id) => {
      const { type, grace, uom, amount, uom2 } = vehicleList[id];
      const searchRegex = new RegExp(searchTerm, 'i');
      debugger
      return (
        searchRegex.test(type) ||
        searchRegex.test(grace) ||
        searchRegex.test(uom) ||
        searchRegex.test(amount) ||
        searchRegex.test(uom2)
      );
    })
    .sort((a, b) => {
      const aValue = vehicleList[a][sortColumn];
      const bValue = vehicleList[b][sortColumn];
      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });


  return (
    Object.keys(vehicleList).length>0?<>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-button"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="search-button"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" onClick={() => handleSort('vehicleType')}>
              Vehicle Type{' '}
              {sortColumn === 'vehicleType' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col" onClick={() => handleSort('grace')}>
              Grace{' '}
              {sortColumn === 'grace' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col" onClick={() => handleSort('uom')}>
              UOM{' '}
              {sortColumn === 'uom' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col" onClick={() => handleSort('amount')}>
              Amount{' '}
              {sortColumn === 'amount' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col" onClick={() => handleSort('uom2')}>
              UOM2{' '}
              {sortColumn === 'uom2' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((ele) => {
            return <tr>
                    {Object.keys(vehicleList[ele]).map(data=>{
                        return <td>{vehicleList[ele][data]}</td>
                    })}
                    <td>
                        <FontAwesomeIcon onClick={()=>handleEdit(ele)} style={{color:"lightblue",marginRight:'8px'}} icon={faPenToSquare} />
                        <FontAwesomeIcon onClick={()=>handleDelete(ele)} style={{color:'red'}} icon={faTrash} />
                    </td>
                </tr>
            })}
        </tbody>
      </table>
    </>:<></>)
}
