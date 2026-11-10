"use client";

import toast from "react-hot-toast";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useEffect, useState, FormEvent } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BookTablePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [minDate, setMinDate] = useState('');
  const [minTime, setMinTime] = useState('');
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const isoString = now.toISOString();
    const today = isoString.split('T')[0];
    setMinDate(today);
    setDate(today);
    const hours = String(now.getHours() + 1).padStart(2, '0');
    const minutes = "00";
    setMinTime(`${hours}:${minutes}`);
    setTime(`${hours}:${minutes}`);
  }, []);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    } else if (session?.user?.username) {
      setName(session.user.username);
    }
  }, [session]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!session || !session.user) {
      toast.error("Please sign in to reserve your table!", {
        duration: 2000,
      });
      router.push("/signin?callbackUrl=/book");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setPhoneError(true);
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`/api/book`, {
        name,
        guests: parseInt(guests),
        phone: parseFloat(cleanPhone),
        date,
        time,
      });

      if (response.status === 200 || response.status === 201) {
        Swal.fire({
          title: "Table Reserved! 🎉",
          html: `<p>Thank you, <b>${name}</b>!</p><p class="mt-2 text-sm text-gray-400">Your table for <b>${guests} guest(s)</b> on <b>${date}</b> at <b>${time}</b> is confirmed.</p>`,
          icon: "success",
          confirmButtonText: "View My Bookings",
          confirmButtonColor: "#f59e0b",
          showCancelButton: true,
          cancelButtonText: "Browse Menu",
          cancelButtonColor: "#3b82f6",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/bookings");
          } else {
            router.push("/dashboard");
          }
        });

        // Reset form
        setPhone('');
      } else {
        toast.error("Error while booking table! Please try again.");
      }
    } catch (err: any) {
      const errMsg = err?.response?.data?.error || "Error while booking table!";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col lg:gap-8 gap-4 w-full lg:p-8 md:p-6 p-4 overflow-x-hidden justify-center items-center font-dmsans'>
      <div className="text-center space-y-2">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-white font-fredoka">
          Book A Table
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-md">
          Reserve your dining experience with instant table confirmation and complimentary welcome drinks.
        </p>
      </div>

      {!session && status !== "loading" && (
        <div className="w-full max-w-2xl bg-amber-500/10 border border-amber-500/40 rounded-xl p-3 md:p-4 text-center flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-amber-200 text-sm">
            &#9432; You are browsing as guest. Sign in to save your booking history and get VIP seating privileges!
          </p>
          <Link
            href="/signin?callbackUrl=/book"
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors"
          >
            Sign In Now
          </Link>
        </div>
      )}

      <div className='flex w-full justify-center items-center lg:max-w-400 md:max-w-180 max-w-130'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-6 lg:p-8 md:p-6 p-2"
        >
          <form
            onSubmit={handleSubmit}
            className="lg:text-md text-sm flex flex-col lg:gap-8 md:gap-6 gap-5 justify-center items-center bg-slate-900/90 border border-slate-800 lg:p-10 md:p-8 p-6 rounded-2xl w-full shadow-2xl backdrop-blur-md"
          >
            {/* Number of Guests */}
            <div className="flex flex-col gap-2 justify-center w-full">
              <label className="text-gray-300 font-medium text-sm">Number of Guests</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                required
                className="border border-slate-700 bg-slate-800 text-gray-100 md:px-4 md:py-3 px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="1">1 Person (Solo Dining)</option>
                <option value="2">2 Persons (Couple Table)</option>
                <option value="3">3 Persons</option>
                <option value="4">4 Persons (Family Table)</option>
                <option value="5">5 Persons</option>
                <option value="6">6 Persons (Celebration Table)</option>
                <option value="8">8+ Persons (Party / Group)</option>
              </select>
            </div>

            {/* Name and Phone */}
            <div className='flex md:flex-row flex-col md:gap-4 gap-4 w-full'>
              <div className="flex flex-col gap-2 justify-center w-full">
                <label className="text-gray-300 font-medium text-sm">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Full Name"
                  className="w-full border border-slate-700 bg-slate-800 text-gray-100 md:px-4 md:py-3 px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <label className="text-gray-300 font-medium text-sm">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError(false);
                  }}
                  required
                  placeholder="10-digit mobile number"
                  className="border border-slate-700 bg-slate-800 text-gray-100 md:px-4 md:py-3 px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
                {phoneError && <p className='text-red-400 text-xs'>Please enter a valid 10-digit mobile number.</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className='flex md:flex-row flex-col md:gap-4 gap-4 w-full'>
              <div className="flex flex-col gap-2 justify-center w-full">
                <label className="text-gray-300 font-medium text-sm">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={minDate}
                  className="border border-slate-700 bg-slate-800 text-gray-100 md:px-4 md:py-3 px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
              <div className="flex flex-col gap-2 justify-center w-full">
                <label className="text-gray-300 font-medium text-sm">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="border border-slate-700 bg-slate-800 text-gray-100 md:px-4 md:py-3 px-3 py-2.5 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 font-semibold text-base bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-black rounded-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center shadow-lg shadow-amber-900/30 cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8H4z"
                    ></path>
                  </svg>
                  Confirming Reservation...
                </>
              ) : (
                "Reserve Table Now"
              )}
            </button>
          </form>
        </motion.div>
        <motion.div>
          <img src="/book-table2.png" alt="Book a table" className='w-400 lg:flex hidden rounded-2xl' />
        </motion.div>
      </div>
    </div>
  );
}
