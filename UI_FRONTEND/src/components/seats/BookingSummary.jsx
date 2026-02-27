import api from "../../services/api";

function BookingSummary({ selected, showId }) {

  const pricePerSeat = 200;
  const total = selected.length * pricePerSeat;

  const handleConfirm = () => {

    api.post("bookings/lock/", {
      show_id: showId,
      seat_ids: selected
    })
    .then(() => alert("Seats locked successfully"))
    .catch(err => console.log(err));
  };

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-lg text-center">

      <p className="text-yellow-400 font-bold">
        Selected Seats: {selected.length}
      </p>

      <p className="mt-2">
        Total: ₹{total}
      </p>

      <button
        onClick={handleConfirm}
        disabled={!selected.length}
        className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded font-bold disabled:opacity-40"
      >
        Proceed
      </button>

    </div>
  );
}

export default BookingSummary;