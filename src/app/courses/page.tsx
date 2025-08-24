import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Courses() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const courses = [
    { id: 1, name: "Mathematics 101", instructor: "Dr. Smith", progress: 75 },
    { id: 2, name: "Computer Science", instructor: "Prof. Johnson", progress: 60 },
    { id: 3, name: "Physics", instructor: "Dr. Williams", progress: 40 },
    { id: 4, name: "Literature", instructor: "Prof. Brown", progress: 90 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Your Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
            <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{course.progress}% complete</span>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}