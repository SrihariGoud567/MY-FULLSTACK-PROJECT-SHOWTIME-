function DateSelector({ dates, selectedDate, setSelectedDate }) {
  if (!dates.length) return null;

  return (
    <div className="flex gap-4 mb-8 flex-wrap">

      {dates.map(dateStr => {
        const d = new Date(dateStr);
        const day = d.toLocaleDateString("en-US", { weekday: "short" });
        const num = d.getDate();

        const active = selectedDate === dateStr;

        return (
          <button
            key={dateStr}
            onClick={() => setSelectedDate(dateStr)}
            className={`
              px-5 py-3 rounded-xl border font-semibold transition
              ${active
                ? "bg-yellow-400 text-black border-yellow-400"
                : "bg-gray-900 text-yellow-300 border-yellow-500/30"}
            `}
          >
            <div>{day}</div>
            <div className="text-lg font-bold">{num}</div>
          </button>
        );
      })}

    </div>
  );
}

export default DateSelector;