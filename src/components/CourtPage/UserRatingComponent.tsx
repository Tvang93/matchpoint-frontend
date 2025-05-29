// 'use client';
// import React, { useState, useEffect } from 'react';
// import { StarIcon } from 'flowbite-react';
// import { CourtRatingsProps } from '@/utils/Interfaces';

// const UserCourtRating = ({ courtId, userId, token, onRatingUpdate }: CourtRatingsProps) => {
//   const [courtRating, setCourtRating] = useState<number>(0);
//   const [safetyRating, setSafetyRating] = useState<number>(0);
//   const [courtHover, setCourtHover] = useState<number>(0);
//   const [safetyHover, setSafetyHover] = useState<number>(0);
//   const [submitted, setSubmitted] = useState<boolean>(false);

//   useEffect(() => {
//     const checkSubmission = async () => {
//       if (userId && token) {
//         const alreadyRated = await getCourtRatingStatus(courtId, userId, token);
//         setSubmitted(alreadyRated);
//       }
//     };
//     checkSubmission();
//   }, [courtId, userId, token]);

//   const handleCourtRating = async (rating: number) => {
//     if (!userId || !token || submitted) return;
//     const success = await submitCourtRating(rating, courtId, userId, token);
//     if (success) {
//       setCourtRating(rating);
//       setSubmitted(true);
//       onRatingUpdate?.();
//     }
//   };

//   const handleSafetyRating = async (rating: number) => {
//     if (!userId || !token || submitted) return;
//     const success = await submitSafetyRating(rating, courtId, userId, token);
//     if (success) {
//       setSafetyRating(rating);
//       setSubmitted(true);
//       onRatingUpdate?.();
//     }
//   };

//   const renderStars = (
//     currentRating: number,
//     hoverRating: number,
//     onRate: (rating: number) => void,
//     onHover: (rating: number) => void,
//     onLeave: () => void
//   ) => (
//     <div className="flex items-center gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <StarIcon
//           key={star}
//           className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
//             star <= (hoverRating || currentRating)
//               ? 'fill-yellow-400 text-yellow-400'
//               : 'text-gray-400 hover:text-yellow-300'
//           } ${submitted ? 'cursor-not-allowed opacity-50' : 'hover:scale-110'}`}
//           onClick={() => !submitted && onRate(star)}
//           onMouseEnter={() => !submitted && onHover(star)}
//           onMouseLeave={() => !submitted && onLeave()}
//         />
//       ))}
//     </div>
//   );

//   if (!userId || !token) {
//     return (
//       <div className="bg-[#3C434E] rounded-lg p-6 mb-6">
//         <p className="text-gray-400 text-sm">Please log in to rate this court.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#3C434E] rounded-lg p-6 mb-6">
//       <h3 className="text-lg font-semibold text-white mb-4">Your Rating</h3>
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-white">Rate Court Quality:</label>
//           {submitted && <span className="text-green-400 text-sm">Submitted</span>}
//         </div>
//         {renderStars(courtRating, courtHover, handleCourtRating, setCourtHover, () => setCourtHover(0))}
//       </div>
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <label className="text-white">Rate Safety:</label>
//           {submitted && <span className="text-green-400 text-sm">Submitted</span>}
//         </div>
//         {renderStars(safetyRating, safetyHover, handleSafetyRating, setSafetyHover, () => setSafetyHover(0))}
//       </div>
//       {submitted && (
//         <p className="text-green-400 text-sm mt-4">
//           Thank you for your rating! It helps other players find great courts.
//         </p>
//       )}
//     </div>
//   );
// };

// export default UserCourtRating;
