import React from "react";

const Specifications = ({ specifications }) => {
    return (
        <div className="">
            <h2 className="text-xl font-bold mb-3">Thông số kỹ thuật</h2>
            <div className="overflow-x-auto border border-gray-300 rounded-md">
                <div className="divide-y divide-gray-300">
                    {specifications.map((spec, index) => (
                        <div
                            key={index}
                            className={`px-4 py-2 flex flex-col text-sm sm:flex-row sm:justify-between ${index % 2 === 0 ? "bg-gray-200" : "bg-white"
                                }`}
                        >
                            <span className="font-semibold text-gray-700 w-32">{spec.label}</span>
                            <span className="text-gray-600 flex-1">
                                {Array.isArray(spec.value) ? (
                                    <ul className="">
                                        {spec.value.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    spec.value
                                )}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Specifications;
