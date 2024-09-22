import React from 'react';

// Import images
import carRentalsImage from 'assets/images/car-rentals.jpg';
import hotelsImage from 'assets/images/hotels.jpg';
import travelPackagesImage from 'assets/images/travel-packages.jpg';

const FlightPromotions = () => {
  return (
    <div className="space-y-6">
      {/* Car Rentals */}
      <div
        onClick={() => {
          window.location.href = 'https://www.avis.com.tr/';
        }}
        className="relative p-4 rounded-lg cursor-pointer drop-shadow-2xl"
      >
        <img
          src={carRentalsImage}
          alt="Car Rentals"
          className="rounded-lg mb-2 w-76 h-60"
        />
        <div className="absolute bottom-4 left-4 text-white mb-4 ml-1 bg-ink-gray">
          <i className="fa-solid fa-2xl fa-car"></i>{' '}
          <h3 className="font- text-center text-title2 text-white">
            Car Rentals
          </h3>
        </div>
      </div>

      {/* Hotels */}
      <div
        onClick={() => {
          window.location.href = 'https://www.booking.com/hotel/';
        }}
        className="relative p-4 rounded-lg cursor-pointer drop-shadow-2xl"
      >
        <img
          src={hotelsImage}
          alt="Hotels"
          className="rounded-lg mb-2 w-76 h-60"
        />
        <div className="absolute bottom-4 left-4 text-white mb-4 ml-1 bg-ink-gray">
          <i className="fa-solid fa-2xl fa-hotel"></i>{' '}
          <h3 className="font- text-center text-title2 text-white">Hotels</h3>
        </div>
      </div>

      {/* Travel Packages */}
      <div
        onClick={() => {
          window.location.href = 'https://www.kayak.com/packages';
        }}
        className="relative p-4 rounded-lg cursor-pointer drop-shadow-2xl"
      >
        <img
          src={travelPackagesImage}
          alt="Travel Packages"
          className="rounded-lg mb-2 w-76 h-60"
        />
        <div className="absolute bottom-4 left-4 text-white mb-4 ml-1 bg-ink-gray">
          <i className="fa fa-2xl fa-suitcase " aria-hidden="true"></i>
          <h3 className="font- text-center text-title2 text-white ">
            Travel Packages
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FlightPromotions;
