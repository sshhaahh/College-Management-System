import React from "react";

const StudentDashboard = () => {
  return (
    <div className="flex h-screen">
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Welcome to Student Dashboard</h1>
        <p className="mt-2 text-gray-600">Here you can manage your courses and assignments.</p>

        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">My Courses</h2>
            <p className="text-gray-500">View and manage your enrolled courses.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Upcoming Exams</h2>
            <p className="text-gray-500">Check your upcoming exam schedule.</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Assignments</h2>
            <p className="text-gray-500">Track and submit assignments.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
