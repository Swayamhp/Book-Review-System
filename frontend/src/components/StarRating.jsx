
const StarRating = ({book}) => {
  return (
    <div className="flex items-center justify-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            book.averageRating && book.averageRating >= star
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        >
          &#9733;
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {book.averageRating ? book.averageRating.toFixed(1) : "No rating"}
      </span>
    </div>
  )
}

export default StarRating;
