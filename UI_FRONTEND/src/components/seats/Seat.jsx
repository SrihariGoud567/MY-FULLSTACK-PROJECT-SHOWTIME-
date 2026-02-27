function Seat({ seat, selected, setSelected }) {

  const isSelected = selected.includes(seat.seat_id);

  const handleClick = () => {
    if (seat.status !== "AVAILABLE") return;

    if (isSelected)
      setSelected(selected.filter(id => id !== seat.seat_id));
    else
      setSelected([...selected, seat.seat_id]);
  };

  const baseStyle =
    "w-10 h-10 text-xs rounded flex items-center justify-center cursor-pointer";

  const statusStyle = {
    AVAILABLE: "bg-gray-700 hover:bg-yellow-400 hover:text-black",
    BOOKED: "bg-red-500 cursor-not-allowed",
    LOCKED: "bg-gray-500 cursor-not-allowed"
  };

  return (
    <div
      onClick={handleClick}
      className={`${baseStyle} ${statusStyle[seat.status]} ${
        isSelected ? "bg-yellow-400 text-black" : "text-white"
      }`}
    >
      {seat.seat_number}
    </div>
  );
}

export default Seat;