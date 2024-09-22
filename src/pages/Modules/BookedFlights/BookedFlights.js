import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  filterInfoSelector,
  setFilterInfo,
} from 'redux/slices/flights/flightsFilterSlice';
import { useGetLocalFlightsQuery } from 'redux/slices/flights/flightsLocalApi';

import airportsData from '../../../airportsData.json';
import FlightCard from '../Flights/FlightCard';
import FlightPromotions from '../Flights/FlightPromotions';
import FlightSearchForm from '../Flights/FlightSearchForm';

const BookedFlights = () => {
  const dispatch = useDispatch();
  const [airport, setAirport] = useState('');
  const filterSelector = useSelector(filterInfoSelector);

  const { data: localFlights, refetch } = useGetLocalFlightsQuery();
  console.log(localFlights);
  useEffect(() => {
    refetch;
  }, [refetch]);

  const handleAirportSelect = (selectedAirport) => {
    setAirport(selectedAirport.label);
    dispatch(
      setFilterInfo({
        field: 'landingAirport',
        value: selectedAirport.value,
      })
    );
  };

  const filteredFlights = localFlights?.filter((flight) => {
    const matchesAirport =
      !filterSelector.landingAirport ||
      flight.landingAirport === filterSelector.landingAirport;

    const matchesDate =
      !filterSelector.flightDate ||
      flight.departure.split('T')[0] === filterSelector.flightDate;

    return matchesAirport && matchesDate;
  });
  const filterSearch = (typeSearch, localFlights) => {
    const allDestinations = [
      ...new Set(localFlights?.map((flight) => flight.landingAirport) ?? []),
    ];

    const resetOption = { label: 'Show All', value: null };

    return [
      resetOption,
      ...allDestinations
        .map((iata) => {
          const airport = airportsData.find((airport) => airport.name === iata);
          return airport ? { label: airport.name, value: airport.name } : null;
        })
        .filter(
          (airport) =>
            airport &&
            airport.label?.toLowerCase().includes(typeSearch?.toLowerCase())
        ),
    ];
  };

  return (
    <div className="min-h-screen bg-primary-lightest rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        <div className="lg:col-span-3">
          <FlightSearchForm
            airport={airport}
            setAirport={setAirport}
            handleAirportSelect={handleAirportSelect}
            filterSearch={filterSearch}
            flightsData={localFlights}
          />
          {filteredFlights?.map((flight) => (
            <FlightCard
              flightNumber={flight.flightNumber}
              key={flight._id}
              airlineCode={flight.airlineCode}
              departure={flight.departure}
              arrival={flight.arrival}
              departureAirport={flight.departureAirport}
              arrivalAirport={flight.landingAirport}
              isBookable={false}
            />
          ))}
        </div>
        <FlightPromotions />
      </div>
    </div>
  );
};

export default BookedFlights;
