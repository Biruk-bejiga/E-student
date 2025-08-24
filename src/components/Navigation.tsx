"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  User, 
  LogOut 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "Schedule", href: "/schedule", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Student Portal</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-2 rounded-lg hover:bg-gray-800 ${
                    isActive ? "bg-gray-800" : ""
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="flex items-center p-2 rounded-lg hover:bg-gray-800 w-full"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}