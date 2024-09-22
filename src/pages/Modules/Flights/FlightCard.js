import React, { useState } from 'react';

import Modal from 'components/Modal';
import PropTypes from 'prop-types';
import { useBookFlightsMutation } from 'redux/slices/flights/flightsLocalApi';
import { apiResHandler } from 'utils/axiosBaseQuery';

import airportsData from '../../../airportsData.json';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
};

// Helper function to find airport name by IATA code
const getAirportName = (iata) => {
  const airport = airportsData.find((airport) => airport.iata === iata);

  // If the airport name exists and is longer than 4 letters, return the name
  if (airport?.name && airport.name.length > 4) {
    return airport.name;
  }

  // Otherwise, return the IATA code as is
  return iata;
};

const FlightCard = ({
  flightNumber,
  airlineCode,
  departure,
  arrival,
  departureAirport,
  arrivalAirport,
  isBookable,
}) => {
  console.log(arrival);
  const [createBooking] = useBookFlightsMutation(); // Ensure you have the mutation imported
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const handleButtonClick = () => {
    const landingAirport = getAirportName(arrivalAirport);
    const flightData = {
      flightNumber,
      airlineCode,
      departure,
      arrival,
      departureAirport,
      landingAirport,
    };
    apiResHandler(
      createBooking({ data: flightData }),
      () => {
        setModalText('Booking Has Been Created');
        setTimeout(() => {
          setShowModal(!showModal);
        }, 1500);
      },
      (error) => {
        setModalText(`Failed to create booking:${error}`);
        setTimeout(() => {
          setShowModal(!showModal);
        }, 1500);
        console.error('Failed to create booking:', error);
      }
    );
  };

  return (
    <div className="bg-sky-lightest p-4 rounded-lg shadow-lg flex flex-col mb-4 border border-gray-200">
      {/* Top Section: Departure, Plane Icon, Arrival */}

      <div className="flex justify-between items-center ">
        {/* Departure Section */}
        <div className="w-1/3 text-left font-medium ">
          <i className="fa-solid fa-plane-departure mr-2"></i> Departure
          <div className="font-bold text-lg mb-1 mt-4">{departureAirport}</div>
          <div className="text-gray-600 mb-1 mt-4">{formatDate(departure)}</div>
        </div>

        {/* Airplane Icon in the center */}
        <div className="flex flex-col items-center justify-center mt-12 ">
          <i
            className="fa fa-plane text-primary fa-2xl text-2xl"
            aria-hidden="true"
          ></i>
          <div className="mt-4 font-semibold">Airline Code: </div>
          <div>{airlineCode}</div>
          <div className="mt-4 font-medium"> Flight Number: </div>
          <div>{flightNumber}</div>
        </div>

        {/* Arrival Section */}
        <div className="w-1/3 text-right font-medium ">
          Arrival
          <i className="fa-solid fa-plane-arrival ml-2"></i>
          <div className="font-bold text-lg mt-4">
            {getAirportName(arrivalAirport)}
          </div>
          <div className="text-gray-600 mt-4">{formatDate(arrival)}</div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center items-center mt-4">
        <div className="w-1/3"></div>
        <div className="w-1/3"></div>
        <div className="w-1/3 text-right">
          {isBookable && (
            <button
              onClick={handleButtonClick}
              className="bg-primary-light text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Book Flight
            </button>
          )}
        </div>
      </div>
      <Modal isOpen={showModal} handleModalClose={() => setShowModal(false)}>
        {modalText}
      </Modal>
    </div>
  );
};

FlightCard.propTypes = {
  departure: PropTypes.string.isRequired,
  airlineCode: PropTypes.string.isRequired,
  flightNumber: PropTypes.string.isRequired,
  arrival: PropTypes.string.isRequired,
  departureAirport: PropTypes.string.isRequired,
  arrivalAirport: PropTypes.string.isRequired,
  isBookable: PropTypes.bool.isRequired,
};

export default FlightCard;
