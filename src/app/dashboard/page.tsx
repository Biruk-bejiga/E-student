import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Calendar, BookOpen, ClipboardList, User } from "lucide-react";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const stats = [
    { title: "Current Courses", value: "5", icon: BookOpen, color: "bg-blue-500" },
    { title: "Assignments Due", value: "3", icon: ClipboardList, color: "bg-red-500" },
    { title: "Upcoming Events", value: "2", icon: Calendar, color: "bg-green-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome, {session.user?.name}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-full ${stat.color} text-white mr-4`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Mathematics", "Computer Science", "Physics", "Literature", "History"].map((course, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-medium">{course}</h3>
              <p className="text-sm text-gray-500">Professor Smith</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Ongoing</span>
                <button className="text-xs text-indigo-600 hover:text-indigo-800">View details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}