import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useGetFlightsQuery } from 'redux/slices/flights/flightsApi';
import {
  filterInfoSelector,
  setFilterInfo,
} from 'redux/slices/flights/flightsFilterSlice';
import { useGetLocalFlightsQuery } from 'redux/slices/flights/flightsLocalApi';

import FlightCard from './FlightCard';
import FlightPromotions from './FlightPromotions';
import FlightSearchForm from './FlightSearchForm'; // New component import
import airportsData from '../../../airportsData.json';

const Flights = () => {
  const dispatch = useDispatch();
  const [airport, setAirport] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: flightsData } = useGetFlightsQuery({ page: currentPage });
  const { data: localFlights } = useGetLocalFlightsQuery();

  const filterSelector = useSelector(filterInfoSelector);
  console.log(localFlights);

  const handleAirportSelect = (selectedAirport) => {
    setAirport(selectedAirport.label);
    dispatch(
      setFilterInfo({
        field: 'landingAirport',
        value: selectedAirport.value,
      })
    );
  };

  const filterSearch = (typeSearch, flightsData) => {
    const allDestinations = [
      ...new Set(
        flightsData?.flights?.flatMap((flight) => flight.route.destinations) ??
          []
      ),
    ];

    const resetOption = { label: 'Show All', value: null };

    return [
      resetOption,
      ...allDestinations
        .map((iata) => {
          const airport = airportsData.find((airport) => airport.iata === iata);
          return airport ? { label: airport.name, value: airport.iata } : null;
        })
        .filter(
          (airport) =>
            airport &&
            airport.label?.toLowerCase().includes(typeSearch?.toLowerCase())
        ),
    ];
  };

  const filteredFlights = flightsData?.flights?.filter(
    (flight) =>
      (!filterSelector.landingAirport ||
        flight.route.destinations.includes(filterSelector.landingAirport)) &&
      (!filterSelector.flightDate ||
        flight.scheduleDate.split('T')[0] === filterSelector.flightDate)
  );

  const handleNextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-primary-lightest rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          <div className="lg:col-span-3">
            <FlightSearchForm
              airport={airport}
              setAirport={setAirport}
              handleAirportSelect={handleAirportSelect}
              filterSearch={filterSearch}
              flightsData={flightsData}
              isBookable={true}
            />
            <div className="flex justify-between m-4">
              <button
                className="bg-primary text-white p-2 rounded"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </button>
              <button
                className="bg-primary text-white p-2 rounded"
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
            {filteredFlights?.map((flight) => (
              <FlightCard
                flightNumber={flight.flightNumber}
                key={flight.id}
                airlineCode={flight.airlineCode}
                departure={flight.scheduleDateTime}
                arrival={flight.estimatedLandingTime}
                departureAirport={'Schiphol Airport'}
                arrivalAirport={flight.route.destinations[0]}
                departureTime={flight.scheduleTime}
                arrivalTime={flight.estimatedLandingTime}
                isBookable={true}
              />
            ))}
          </div>
          <FlightPromotions />
        </div>
      </div>
    </>
  );
};

export default Flights;
