import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({
    onClick,
    className = "",
    full = false,
    type = "button",
    bgColor = "primary",
    children,
    link = false,
    to = "",
    ...props
}) => {
    let bgClassName = "";
    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary text-white";
            break;

        case "outline":
            bgClassName = "bg-white border border-primary text-primary";
            break;

        case "secondary":
            bgClassName = "bg-secondary text-white";
            break;

        case "text":
            bgClassName = "text-primary1";
            break;

        case "delete":
            bgClassName = "text-white bg-red-500";
            break;

        case "seeMore":
            bgClassName = "text-primary border border-primary py-2 px-4 rounded-full bg-white";
            break

        default:
            break;
    }

    const commonClasses = `py-2 px-4 text-center rounded ${full ? "w-full" : ""
        } ${bgClassName} ${className}`;

    if (link) {
        return (
            <Link to={to} className={commonClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={commonClasses} {...props}>
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    full: PropTypes.bool,
    type: PropTypes.string,
    bgColor: PropTypes.string,
    children: PropTypes.node.isRequired,
    link: PropTypes.bool,
    to: PropTypes.string,
};

