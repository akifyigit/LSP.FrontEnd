import React from 'react';

import SearchableSelectBox from 'components/SearchableSelectBox/SearchableSelectBox';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilterInfo } from 'redux/slices/flights/flightsFilterSlice';

const FlightSearchForm = ({
  airport,
  setAirport,
  handleAirportSelect,
  filterSearch,
  flightsData,
  isBookable,
}) => {
  const dispatch = useDispatch();
  const handleDateChange = (e) => {
    dispatch(
      setFilterInfo({
        field: 'flightDate',
        value: e.target.value,
      })
    );
  };
  return (
    <div>
      <div className="bg-sky-lightest p-6 rounded-lg shadow-md mb-4">
        {' '}
        {isBookable && (
          <h2 className="text-title3  font-bold text-center mb-4">
            BOOK YOUR FLIGHT
          </h2>
        )}
        <form className="flex justify-center gap-x-8">
          <div className="flex flex-1 w-1/2 items-center">
            <label className="font-bold mr-4">Destination:</label>
            <SearchableSelectBox
              placeholder={
                <i className="fa-solid fa-plane-departure text-primary"></i>
              }
              className="w-full"
              showDefault={true}
              inputValue={airport}
              onChange={setAirport}
              onSelect={handleAirportSelect}
              name="airport"
              id="airport"
              items={filterSearch(airport, flightsData)} // Filtered data passed here
            />
          </div>
          <div className="flex flex-1 w-1/2 items-center">
            <label className="font-bold mr-4">Flight Date:</label>
            <input
              id="flightDate"
              className="border border-sky-light rounded w-full px-4 py-2"
              type="date"
              name="flightDate"
              max={new Date().toISOString().split('T')[0]}
              onChange={handleDateChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
FlightSearchForm.propTypes = {
  airport: PropTypes.string.isRequired,
  setAirport: PropTypes.func.isRequired,
  handleAirportSelect: PropTypes.func.isRequired,
  filterSearch: PropTypes.func.isRequired,
  flightsData: PropTypes.object,
  handleDateChange: PropTypes.func.isRequired,
  isBookable: PropTypes.func.isRequired,
};
export default FlightSearchForm;
