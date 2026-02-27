import { useEffect, useState } from "react";
import api from "../../services/api";

function SeatGrid({ showId }) {

    /* CONFIG */
    const rows = Array.from({ length: 16 }, (_, i) =>
        String.fromCharCode(65 + i)
    );

    const cols = Array.from({ length: 16 }, (_, i) => i + 1);

    const prices = {
        silver: 50,
        gold: 110,
        platinum: 175,
    };

    /* STATE */
    const [selectedSeats, setSelectedSeats] = useState(new Set());
    const [bookedSeats, setBookedSeats] = useState([]);
    const [lockedSeats, setLockedSeats] = useState([]);
    const [timer, setTimer] = useState(300);
    const [animSeat, setAnimSeat] = useState(null);


    /* FETCH SEATS */
    useEffect(() => {
        if (!showId) return;

        api.get(`bookings/seats/${showId}/`)
            .then(res => {
                setBookedSeats(res.data.booked || []);
                setLockedSeats(res.data.locked || []);
            })
            .catch(console.log);

    }, [showId]);


    /* TIMER */
    useEffect(() => {

        if (!selectedSeats.size) return;

        setTimer(300);

        const interval = setInterval(() => {
            setTimer(prev => {

                if (prev <= 1) {
                    releaseSeats();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [selectedSeats]);


    /* RELEASE LOCKS */
    const releaseSeats = async () => {

        const seats = [...selectedSeats];

        try {
            await api.post("bookings/cancel/", {
                show_id: showId,
                seats
            });
        } catch {}

        setSelectedSeats(new Set());
    };


    /* CATEGORY */
    const getCategory = (row) => {
        if (["A","B","C"].includes(row)) return "silver";
        if (["D","E","F"].includes(row)) return "gold";
        return "platinum";
    };


    /* TOGGLE */
    const toggleSeat = async (seatId) => {

        if (bookedSeats.includes(seatId)) return;

        const updated = new Set(selectedSeats);

        /* REMOVE */
        if (updated.has(seatId)) {

            updated.delete(seatId);

            setSelectedSeats(updated);

            try {
                await api.post("bookings/cancel/", {
                    show_id: showId,
                    seats: [seatId]
                });
            } catch {}

            return;
        }

        /* ANIMATION */
        setAnimSeat(seatId);
        setTimeout(()=>setAnimSeat(null),150);

        /* ADD */
        updated.add(seatId);
        setSelectedSeats(updated);

        try {

            await api.post("bookings/lock/", {
                show_id: showId,
                seat: seatId
            });

        } catch {
            updated.delete(seatId);
            setSelectedSeats(new Set(updated));
        }
    };


    /* TOTAL */
    const total = [...selectedSeats].reduce((sum,id)=>{
        const category = getCategory(id[0]);
        return sum + prices[category];
    },0);


    /* CONFIRM */
    const confirmBooking = async () => {

        if (!selectedSeats.size) return;

        try {

            await api.post("bookings/confirm/", {
                show_id: showId,
                seats: [...selectedSeats]
            });

            setSelectedSeats(new Set());

            const res = await api.get(`bookings/seats/${showId}/`);
            setBookedSeats(res.data.booked || []);
            setLockedSeats(res.data.locked || []);

        } catch {}
    };


    /* TIMER FORMAT */
    const minutes = String(Math.floor(timer/60)).padStart(2,"0");
    const seconds = String(timer%60).padStart(2,"0");


    return (
        <div className="flex flex-col items-center mt-10">

            {/* SCREEN */}
            <div className="relative mb-14">
                <div className="w-[420px] h-16 bg-gradient-to-b from-gray-200 to-gray-400 rounded-t-full shadow-lg" />
                <p className="absolute left-1/2 -translate-x-1/2 top-5 text-black font-semibold text-sm tracking-widest">
                    SCREEN THIS WAY
                </p>
            </div>


            {/* TIMER */}
            {selectedSeats.size > 0 && (
                <div className="mb-6 text-yellow-400 font-semibold text-lg">
                    Time Left: {minutes}:{seconds}
                </div>
            )}


            {/* GRID */}
            <div className="flex">

                {/* LEFT */}
                <div>
                    {rows.map(row=>{

                        return(
                            <div key={row} className="flex items-center mb-3">

                                <div className="w-8 mr-3 text-sm text-gray-400 font-semibold">
                                    {row}
                                </div>

                                {cols.slice(0,8).map(col=>{

                                    const seatId=row+col;
                                    const isSelected=selectedSeats.has(seatId);
                                    const isBooked=bookedSeats.includes(seatId);
                                    const isLocked=lockedSeats.includes(seatId);

                                    const category=getCategory(row);

                                    let base="";
                                    if(category==="silver") base="border-gray-400";
                                    if(category==="gold") base="border-yellow-400";
                                    if(category==="platinum") base="border-purple-400";

                                    return(
                                        <button
                                            key={seatId}
                                            disabled={isBooked}
                                            onClick={()=>toggleSeat(seatId)}
                                            className={`
w-8 h-8 mx-1 rounded-md border text-xs font-semibold transition transform
${animSeat===seatId?"scale-125":"scale-100"}
${isBooked || (isLocked && !isSelected)
? "bg-red-600 border-red-600 text-white"
: isSelected
? "bg-yellow-400 border-yellow-400 text-black"
: base}
`}
                                        >
                                            {col}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>


                {/* WALKWAY */}
                <div className="flex flex-col justify-center items-center mx-6 select-none">
                    <div className="text-gray-500 text-xs tracking-widest leading-5 text-center">
                        {"WALK         THIS          WAY".split("").map((c,i)=>
                            <div key={i}>{c}</div>
                        )}
                    </div>
                </div>


                {/* RIGHT */}
                <div>
                    {rows.map(row=>{

                        return(
                            <div key={row} className="flex items-center mb-3">

                                {cols.slice(8).map(col=>{

                                    const seatId=row+col;
                                    const isSelected=selectedSeats.has(seatId);
                                    const isBooked=bookedSeats.includes(seatId);
                                    const isLocked=lockedSeats.includes(seatId);

                                    const category=getCategory(row);

                                    let base="";
                                    if(category==="silver") base="border-gray-400";
                                    if(category==="gold") base="border-yellow-400";
                                    if(category==="platinum") base="border-purple-400";

                                    return(
                                        <button
                                            key={seatId}
                                            disabled={isBooked}
                                            onClick={()=>toggleSeat(seatId)}
                                            className={`
w-8 h-8 mx-1 rounded-md border text-xs font-semibold transition transform
${animSeat===seatId?"scale-125":"scale-100"}
${isBooked || (isLocked && !isSelected)
? "bg-red-600 border-red-600 text-white"
: isSelected
? "bg-yellow-400 border-yellow-400 text-black"
: base}
`}
                                        >
                                            {col}
                                        </button>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>

            </div>


            {/* SUMMARY */}
            <div className="bg-gray-900 mt-8 px-10 py-6 rounded-xl text-center border border-yellow-500/20">

                <p className="text-yellow-400 font-semibold mb-2">
                    Selected Seats: {selectedSeats.size}
                </p>

                <p className="text-gray-300 mb-4">
                    Total: ₹{total}
                </p>

                <button
                    onClick={confirmBooking}
                    disabled={!selectedSeats.size}
                    className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold disabled:opacity-40"
                >
                    Proceed
                </button>

            </div>

        </div>
    );
}

export default SeatGrid;