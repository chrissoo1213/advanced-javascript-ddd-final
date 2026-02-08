import express from "express"
import cors from "cors"
import { db, enrollStudentInCourse } from "./enrollment-handler.js"
const app = express()

/*  Middleware  */
app.use(cors())
app.use(express.json())

/*  Routes  */
app.get("/api", (req, res) => {
	res.json({ message: "api goes here ..." })
})

/* health check  */
app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", timestamp: new Date().toISOString() })
})

app.post("/api/enroll", (req, res) => {
	try {
		const { studentId, courseId } = req.body
		const result = enrollStudentInCourse(studentId, courseId)
		res.json(result)
	} catch (error) {
		// Generic error handling
		res.status(400).json({ error: (error as Error).message })
	}
})

// More God Functions!
app.get("/api/students", (req, res) => {
	const students = db.prepare("SELECT * FROM students").all()
	res.json(students)
})

app.get("/api/courses", (req, res) => {
	const courses = db.prepare("SELECT * FROM courses").all()
	res.json(courses)
})

app.get("/api/students/:id", (req, res) => {
	const student = db
		.prepare("SELECT * FROM students WHERE id = ?")
		.get(req.params.id)
	if (!student) {
		return res.status(404).json({ error: "Student not found" })
	}
	res.json(student)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(
		`Server is running. Test it out at http://localhost:${PORT}/health`,
	)
})
