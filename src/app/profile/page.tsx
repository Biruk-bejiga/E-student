import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500 text-2xl font-bold">
            {session.user?.name?.charAt(0)}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Personal Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Student ID:</span> S123456</p>
              <p><span className="font-medium">Major:</span> Computer Science</p>
              <p><span className="font-medium">Enrollment Date:</span> September 2023</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Contact Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {session.user?.email}</p>
              <p><span className="font-medium">Phone:</span> (555) 123-4567</p>
              <p><span className="font-medium">Address:</span> 123 College Ave, Campus Town</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}