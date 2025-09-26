import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "text-sm bg-yellow-400 uppercase font-semibold text-stone-800 inline-block rounded-full hover:bg-yellow-300 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2";

  const styles = {
    primary: base + " py-3 px-4 md:px-6 md:py-4",
    small: base + " py-2 px-4 md:px-5 md:py-2.5 text-xs",
    round: base + " py-1 px-2.5 text-sm",
    secondary:
      "text-sm transparent border-2 border-stone-300 rounded-full py-2.5 px-3.5 md:px-5.5 md:py-3.5 hover:text-stone-800  focus:bg-stone-300 hover:bg-stone-300 transition-color font-semibold uppercase duration-300 focus:ring focus:ring-stone-500 focus:ring-offset- tracking-wide",
  };

  if (to)
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} className={styles[type]} disabled={disabled}>
        {children}
      </button>
    );

  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
