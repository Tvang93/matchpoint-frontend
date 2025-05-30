'use client'
import React from 'react'
import { StarIcon } from 'flowbite-react';

interface OverallRatingsProps {
  currentCourtRating: number;
  currentSafetyRating: number;
}

const OverallRatingsComponent = ({ currentCourtRating, currentSafetyRating }: OverallRatingsProps) => {
  return (
    <div className="bg-[#3C434E] rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-[#E1FF00] mb-4">Court Ratings</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">Court Quality</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(currentCourtRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-white text-sm">
              {currentCourtRating > 0 ? currentCourtRating.toFixed(1) : 'No ratings yet'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-white font-medium">Safety</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(currentSafetyRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="text-white text-sm">
              {currentSafetyRating > 0 ? currentSafetyRating.toFixed(1) : 'No ratings yet'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverallRatingsComponent;