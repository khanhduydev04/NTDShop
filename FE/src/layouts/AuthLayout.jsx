import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import "../App.css";  

export const AuthLayout = () => {
  useEffect(() => {
    const createSnowflakes = () => {
      const snowflake = document.createElement("div");
      snowflake.className = "snowflake";
      snowflake.style.left = `${Math.random() * 100}vw`;
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      document.body.appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    };

    const interval = setInterval(createSnowflakes, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <main className="flex-1 bg-accent bg-auth" >
        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};