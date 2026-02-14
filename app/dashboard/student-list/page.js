        "use client"
import { db } from "@/config/firebase.config";
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { LuView } from "react-icons/lu";


export default function StudentList() {
    const [students,setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const {data: session} = useSession();
    console.log(session);

    useEffect(()=>{
        const fetchStudents = async () =>{
            try{
                const studentRef = query(collection(db,"enrollments"),where("user", "==", session?.user?.id))
                const snapShot = await getDocs(studentRef);
                const compileStudents =[];
                snapShot.docs.forEach((doc)=>{
                    compileStudents.push({
                        id: doc.id,
                        data: doc.data(),
                    });
                });
                setStudents(compileStudents);
                console.log(compileStudents);
            }
            catch(error) {
                console.error("Error fetching students:", error);
            }
            finally {
                setLoading(false);
            }
        }
        if (session) {
            fetchStudents();
        }
    },[session])
    if(loading) {
        return (
            <main className="h-[80vh] flex items-center justify-center">
                <CircularProgress className="text-blue-500"/>
            </main>
        )
    }
    return (
        <main className="min-h-screen max-w-4xl mx-auto my-10 p-4">
            <h1 className="text-3xl text-blue-500 font-bold text-center mb-5">Student List</h1>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead sx={{backgroundColor: "#A9A9A9"}}>
                        <TableRow>
                            <TableCell sx={{fontWeight: "medium"}}>S/N</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>FULLNAME</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>PHONE NUMBER</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>EXAM TYPE</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>EXAM DATE</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>SUBJECTS</TableCell>
                            <TableCell sx={{fontWeight: "medium"}}>VIEW</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student)=>
                        <TableRow key={student.id}>
                            <TableCell>{student.data.fullName}</TableCell>
                            <TableCell>{student.data.phoneNumber}</TableCell>
                            <TableCell>{student.data.examType}</TableCell>
                            <TableCell>{student.data.examDate}</TableCell>
                            <TableCell>{student.data.selectedSubjects.join(",")}</TableCell>
                            <TableCell><LuView className="text-2xl cursor-pointer"/></TableCell>
                        </TableRow>
                        )}
                    </TableBody>

                </Table>
            </TableContainer>
        </main>
    )
}