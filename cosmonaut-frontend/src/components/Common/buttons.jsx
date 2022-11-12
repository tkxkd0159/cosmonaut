export const BuildButton = ({ onClick, content }) => {
  return (
    <button
      className="md:w-auto rounded-full text-center md:shadow-md shadow-sm transform transition md:mx-0 md:px-10 ease-in-out hover:scale-105 bg-gradient-to-r from-purple-500 to-purple-200 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-200 border-3 border-indigo-900 md:py-3 py-2 px-12  font-heading text-lg text-white"
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const NextButton = ({ onClick, content }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      class="md:w-auto rounded-full mx-auto text-center md:shadow-md shadow-sm transform transition md:mx-0 md:px-10 ease-in-out hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 border-3 border-indigo-900 md:py-3 py-2 px-12  font-heading text-lg text-gray-50"
    >
      {content}
    </button>
  );
};

// {
//   executeRes.result === "success" && queryRes.result === "success" ? (
//     <div class="flex items-center justify-center md:mt-8 mt-3 ">
//       <button
//         type="button"
//         onClick={() => {
//           nextLesson();
//         }}
//         class=" md:w-auto rounded-full mx-auto text-center md:shadow-md shadow-sm transform transition md:mx-0 md:px-10 ease-in-out hover:scale-105 bg-gradient-to-r from-green-400 to-blue-500 border-3 border-indigo-900 md:py-3 py-2 px-12  font-heading text-lg text-gray-50"
//       >
//         Jump to Next Lesson
//       </button>
//     </div>
//   ) : (
//     <div class="flex items-center justify-center md:mt-8 mt-3 ">
//       <button
//         type="button"
//         onClick={runFetch}
//         disabled={runLoading}
//         class="md:w-auto rounded-full text-center md:shadow-md shadow-sm transform transition md:mx-0 md:px-10 ease-in-out hover:scale-105 bg-gradient-to-r from-purple-500 to-purple-200 hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-200 border-3 border-indigo-900 md:py-3 py-2 px-12  font-heading text-lg text-white"
//       >
//         Deploy the code
//       </button>
//     </div>
//   );
// }
