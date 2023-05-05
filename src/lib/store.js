import { configureStore } from '@reduxjs/toolkit';
import {saveToLocalStorage, loadFromLocalStorage} from './storeSave'

const initialState = {
    vehicleList:{"cc08f481-23d5-4952-b6b7-1ca8d1838da3":{"type":"car","grace":"23","uom":"km","amount":"56","uom2":"mi"},
    "cc08f481-23d5-4952-b6b7-1ca8d1838da5":{"type":"motorcycle","grace":"203","uom":"mi","amount":"560","uom2":"km"},
    "cc08f481-23d5-4952-b6b7-1ca8d1838da7":{"type":"truck","grace":"39","uom":"km","amount":"6","uom2":"mi"}
  },
    activeVehicleID:'',
    activeVehicle:{type:'',grace:'',uom:'',amount:'',uom2:''}
};
const persistedState = loadFromLocalStorage() || initialState;
function reducer(state = persistedState, action) {
  switch(action.type) {
    // handle addition to vehicle list
    case 'ADD_VEHICLE_ACTION':
      return {...state,vehicleList:{...state.vehicleList,[action.payload.id]:action.payload.vehicle}}
    // handle updation to vehicle list
    case 'UPDATE_VEHICLE_ACTION':
      return {...state,vehicleList:{...state.vehicleList,[action.payload.id]:action.payload.vehicle}}
    // handle active vehicle for edit state
    case 'UPDATE_VEHICLE_ID':
      return {...state,activeVehicleID:action.payload.activeVehicleID,activeVehicle:action.payload.activeVehicle}
    // to delete vehicle
    case 'DELETE_VEHICLE' : 
      return function (){
        let vehicles = {...state.vehicleList};
        delete vehicles[action.payload.activeVehicleID];
        return {...state,vehicleList:vehicles}
      }()
    default:
      return state;
  }
}

const store = configureStore({
  reducer: reducer,
  persistedState
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;