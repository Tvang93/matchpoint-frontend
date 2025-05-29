'use client'
import React from 'react'
import { useState } from 'react';
import { StarIcon } from 'flowbite-react';

interface CourtRatingsProps {
  courtId: number;
  userId: number | null;
  token: string | null;
  currentCourtRating: number;
  currentSafetyRating: number;
  onRatingUpdate?: () => void;
}

const RatingModalComponent = ({ courtId, userId, token, currentCourtRating, currentSafetyRating, onRatingUpdate }: CourtRatingsProps) => {

  const [courtRating, setCourtRating] = useState<number>(0);
  const [safetyRating, setSafetyRating] = useState<number>(0);
  const [courtHover, setCourtHover] = useState<number>(0);
  const [safetyHover, setSafetyHover] = useState<number>(0);
  const [isSubmittingCourt, setIsSubmittingCourt] = useState(false);
  const [isSubmittingSafety, setIsSubmittingSafety] = useState(false);
  const [courtSubmitted, setCourtSubmitted] = useState(false);
  const [safetySubmitted, setSafetySubmitted] = useState(false);

  const url = "https://matchpointbackend-c4btg3ekhea4gqcz.westus-01.azurewebsites.net/";

  const handleCourtRating = async (rating: number) => {
    if (!userId || !token || isSubmittingCourt || courtSubmitted) return;

    setIsSubmittingCourt(true);
    try {
      const res = await fetch(`${url}Location/AddCourtRating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          Rating: rating,
          LocationId: courtId,
          UserId: userId
        }),
      });

      if (res.ok) {
        setCourtRating(rating);
        setCourtSubmitted(true);
        onRatingUpdate?.();
      } else {
        console.error('Failed to submit court rating');
      }
    } catch (error) {
      console.error('Error submitting court rating:', error);
    } finally {
      setIsSubmittingCourt(false);
    }
  };

  const handleSafetyRating = async (rating: number) => {
    if (!userId || !token || isSubmittingSafety || safetySubmitted) return;

    setIsSubmittingSafety(true);
    try {
      const res = await fetch(`${url}Location/AddSafetyRating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          Rating: rating,
          LocationId: courtId,
          UserId: userId
        }),
      });

      if (res.ok) {
        setSafetyRating(rating);
        setSafetySubmitted(true);
        onRatingUpdate?.();
      } else {
        console.error('Failed to submit safety rating');
      }
    } catch (error) {
      console.error('Error submitting safety rating:', error);
    } finally {
      setIsSubmittingSafety(false);
    }
  };

  const renderStars = (
    currentRating: number,
    hoverRating: number,
    onRate: (rating: number) => void,
    onHover: (rating: number) => void,
    onLeave: () => void,
    isSubmitting: boolean,
    isSubmitted: boolean,
    isLoggedIn: boolean
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
              star <= (hoverRating || currentRating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-400 hover:text-yellow-300'
            } ${
              !isLoggedIn || isSubmitting || isSubmitted
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-110'
            }`}
            onClick={() => isLoggedIn && !isSubmitting && !isSubmitted && onRate(star)}
            onMouseEnter={() => isLoggedIn && !isSubmitting && !isSubmitted && onHover(star)}
            onMouseLeave={() => isLoggedIn && !isSubmitting && !isSubmitted && onLeave()}
          />
        ))}
      </div>
    );
  };

  const isLoggedIn = userId !== null && token !== null;

  return (
    <div className="bg-[#3C434E] rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-[#E1FF00] mb-4">Rate This Court</h2>
      
      {!isLoggedIn && (
        <p className="text-gray-400 mb-4 text-sm">
          Please log in to rate this court
        </p>
      )}


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


      {isLoggedIn && (
        <div className="border-t border-gray-600 pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Rating</h3>
          

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white">Rate Court Quality:</label>
              {courtSubmitted && (
                <span className="text-green-400 text-sm">Submitted</span>
              )}
            </div>
            {renderStars(
              courtRating,
              courtHover,
              handleCourtRating,
              setCourtHover,
              () => setCourtHover(0),
              isSubmittingCourt,
              courtSubmitted,
              isLoggedIn
            )}

          </div>


          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white">Rate Safety:</label>
              {safetySubmitted && (
                <span className="text-green-400 text-sm">Submitted</span>
              )}
            </div>
            {renderStars(
              safetyRating,
              safetyHover,
              handleSafetyRating,
              setSafetyHover,
              () => setSafetyHover(0),
              isSubmittingSafety,
              safetySubmitted,
              isLoggedIn
            )}

          </div>

          {(courtSubmitted || safetySubmitted) && (
            <p className="text-green-400 text-sm mt-4">
              Thank you for your rating! It helps other players find great courts.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingModalComponent;