import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUuid } from "../../lib/uuid";
import './popup.css';

const MyPopup = ({show:showPopup,setShow:setPopup}) => {
  const [show, setShow] = useState(showPopup);
  const [currentVehicle,setCurrentVehicle] = useState({type:'',grace:'',uom:'',amount:'',uom2:''})
  const handleClose = () => {setShow(false);setPopup(false)};
  const handleShow = () => {setShow(true);}
  const activeVehicleID = useSelector(state => state.activeVehicleID);
  const activeVehicle = useSelector(state => state.activeVehicle);
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const [error,setError] = useState("")

  useEffect(()=>{
    setCurrentVehicle(activeVehicle) // populate vehicle for edit state
    // debugger
    setError("")
  },[activeVehicleID]);

  useEffect(()=>{setShow(showPopup)},[showPopup]);

  useEffect(() => {
    setIsValid(currentVehicle.type !== '' && currentVehicle.grace !== '' && currentVehicle.uom !== '' && currentVehicle.amount !== '' && currentVehicle.uom2 !== '');
  }, [currentVehicle]);

  const handleSave = () => {
    if (isValid) {
      if(activeVehicleID.length === 0){
        dispatch({ type: 'ADD_VEHICLE_ACTION',payload:{vehicle:currentVehicle,id:createUuid()} });
      }
      else {
        dispatch({ type: 'UPDATE_VEHICLE_ACTION',payload:{vehicle:currentVehicle,id:activeVehicleID} });
      }
      handleClose();
      setError("")
    }
    else {
      setError('Please fill all the mandatory fields');
    }
  }

  const handleAdd = () =>{
    dispatch({ type: 'UPDATE_VEHICLE_ID',payload:{activeVehicleID:'',activeVehicle:{type:'',grace:'',uom:'',amount:'',uom2:''}} });
    setCurrentVehicle({type:'',grace:'',uom:'',amount:'',uom2:''})
    handleShow();
  }

  const handleInput = (event) => {
    setCurrentVehicle({...currentVehicle,[event.target.id]:event.target.value})
    console.log(event.target,currentVehicle)
  }

  return (
    <>
      <button className="btn btn-primary my-3" onClick={handleAdd}>
        Add
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Popup Form</h5>
              <button
                type="button"
                className="close"
                onClick={handleClose}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form>
              <div class="row">
                <div class="col-md-4">
                  <div class="mb-3">
                    <div className="form-group">
                      <label htmlFor="vehicleType">Vehicle Type</label>
                      <select value={currentVehicle.type} onChange={handleInput} className="form-control" id="type" required>
                        <option value="">Select Vehicle Type*</option>
                        <option value="car">Car</option>
                        <option value="motorcycle">Motorcycle</option>
                        <option value="truck">Truck</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <div className="form-group">
                      <label htmlFor="grace">Grace*</label>
                      <input
                      value={currentVehicle.grace}
                      onChange={handleInput}
                      type="number"
                      className="form-control"
                      id="grace"
                      placeholder="Enter Grace"
                    />
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="mb-3">
                    <div className="form-group">
                      <label htmlFor="uom">UOM*</label>
                      <select value={currentVehicle.uom} onChange={handleInput} className="form-control" id="uom">
                        <option value="">Select UOM</option>
                        <option value="km">Kilometers</option>
                        <option value="mi">Miles</option>
                        <option value="hr">Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <div className="form-group">
                      <label htmlFor="amount">Amount*</label>
                      <input
                        value={currentVehicle.amount}
                        onChange={handleInput}
                        type="number"
                        className="form-control"
                        id="amount"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <div className="form-group">
                      <label htmlFor="uom">UOM 2*</label>
                      <select value={currentVehicle.uom2} onChange={handleInput} className="form-control" id="uom2">
                        <option value="">Select UOM 2</option>
                        <option value="km">Kilometers</option>
                        <option value="mi">Miles</option>
                        <option value="hr">Hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {error.length? <span className="mx-3 popup-error-msg">{error}</span>:null}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="button" onClick={handleSave} className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default MyPopup;
