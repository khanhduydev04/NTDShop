import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-center space-x-2 font-semibold text-white text-xs sm:text-sm lg:text-base">
      <span>Kết thúc sau:</span>
      <div className="flex items-center space-x-1">
        <div className="bg-white/15 rounded-full p-1 lg:p-2 size-7 lg:size-9 flex items-center justify-center">
          {timeLeft.days}
        </div>
        <span>ngày</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="bg-white/15 rounded-full p-1 lg:p-2 size-7 lg:size-9 flex items-center justify-center">
          {timeLeft.hours}
        </div>
        <span>giờ</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="bg-white/15 rounded-full p-1 lg:p-2 size-7 lg:size-9 flex items-center justify-center">
          {timeLeft.minutes}
        </div>
        <span>phút</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="bg-white/15 rounded-full p-1 lg:p-2 size-7 lg:size-9 flex items-center justify-center">
          {timeLeft.seconds}
        </div>
        <span>giây</span>
      </div>
    </div>
  );
}

Countdown.propTypes = {
  targetDate: PropTypes.string.isRequired,
};
