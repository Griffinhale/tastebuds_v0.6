"use client";

import React from "react";

interface Course {
  courseName: string;
  items: string[];
}

interface Platter {
  title: string;
  courses: Course[];
}

interface Props {
  platter: Platter;
}

const PlatterContainer: React.FC<Props> = ({ platter }) => {
  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-2 text-lg font-semibold">{platter.title}</h2>
      {/* The courses in this platter */}
      {platter.courses.map((course, idx) => (
        <div key={idx} className="mb-4 rounded-md border border-slate-300 p-2">
          {/* Course Title */}
          <h3 className="mb-1 font-medium">{course.courseName}</h3>
          {/* Items in the course */}
          <ul className="ml-4 list-disc">
            {course.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PlatterContainer;