import { auth, signOut } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";


export default async function Profile () {
    const session = await auth();
    if(!session){
        redirect("/auth/login");
    }

    return (
        <main className="min-h-screen flex justify-center py-10 px-2">
            <div className="w-full md:w-90 max-h-120 rounded shadow-md py-10 px-4">
                <h1 className="text-center font-semibold text-xl">Profile Details</h1>
                <div className="mt-2 flex justify-center">
                    <Image
                    src={session.user?.image || <CgProfile />}
                    alt="profile-image"
                    width={80}
                    height={80}
                    className="w-15 h-15 rounded-full"
                    />
                </div>
                <div className="px-4 py-5 flex flex-col gap-4 mt-8 w-80 h-60 shadow rounded-md ">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Full Name</p>
                        <p className="text-gray-600 text-xs">{session?.user?.name}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-600 text-xs">{session?.user?.email}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Phone Number</p>
                        <p className="text-gray-600 text-xs">+234 813 603 0632</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Address</p>
                        <p className="text-gray-600 text-xs">Jikwoyi Abuja</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-semibold">Gender</p>
                        <p className="text-gray-600 text-xs">Male</p>
                    </div>
                </div>

                <form 
                action={async () =>{
                    "use server"
                    await signOut();
                }}
                className="mt-5">
                    <button className="flex justify-center items-center w-30 h-10 bg-red-500 text-white rounded shadow cursor-pointer">
                        <LuLogOut />
                        <span className="ml-1">Logout</span>
                    </button>
                </form>
            </div>
        </main>
    )
}