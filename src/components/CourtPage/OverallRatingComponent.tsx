// 'use client';
// import React from 'react';
// import { StarIcon } from 'flowbite-react';

// interface CourtOverallRatingProps {
//   courtRating: number;
//   safetyRating: number;
// }

// const CourtOverallRating = ({ courtRating, safetyRating }: CourtOverallRatingProps) => {
//   const renderStars = (rating: number) => (
//     <div className="flex items-center gap-2">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <StarIcon
//           key={star}
//           className={`w-5 h-5 ${
//             star <= Math.round(rating)
//               ? 'fill-yellow-400 text-yellow-400'
//               : 'text-gray-400'
//           }`}
//         />
//       ))}
//       <span className="text-white text-sm">
//         {rating > 0 ? rating.toFixed(1) : 'No ratings yet'}
//       </span>
//     </div>
//   );

//   return (
//     <div className="bg-[#3C434E] rounded-lg p-6 mb-6">
//       <h2 className="text-xl font-bold text-[#E1FF00] mb-4">Court Overview</h2>
//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-white font-medium">Court Quality</span>
//           {renderStars(courtRating)}
//         </div>
//         <div className="flex items-center justify-between">
//           <span className="text-white font-medium">Safety</span>
//           {renderStars(safetyRating)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourtOverallRating;