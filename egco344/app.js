//node app.js for EGCO344 - Web Services and APIs
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// Mock student data
const students = [
    // Computer Engineering
    { id: '001', name: 'Alice Johnson', department: 'Computer Engineering', gpa: 3.85 },
    { id: '002', name: 'Bob Smith', department: 'Computer Engineering', gpa: 3.62 },
    { id: '003', name: 'Carol White', department: 'Computer Engineering', gpa: 3.91 },
    
    // Electrical Engineering
    { id: '004', name: 'David Brown', department: 'Electrical Engineering', gpa: 3.75 },
    { id: '005', name: 'Emma Davis', department: 'Electrical Engineering', gpa: 3.54 },
    { id: '006', name: 'Frank Miller', department: 'Electrical Engineering', gpa: 3.88 },
    
    // Civil Engineering
    { id: '007', name: 'Grace Lee', department: 'Civil Engineering', gpa: 3.79 },
    { id: '008', name: 'Henry Wilson', department: 'Civil Engineering', gpa: 3.65 },
    { id: '009', name: 'Ivy Martinez', department: 'Civil Engineering', gpa: 3.92 },
    
    // Mechanical Engineering
    { id: '010', name: 'Jack Taylor', department: 'Mechanical Engineering', gpa: 3.58 },
    { id: '011', name: 'Karen Anderson', department: 'Mechanical Engineering', gpa: 3.71 },
];

// API: Get all students with GPA by department
app.get('/api/students/gpa', (req, res) => {
    const groupedByDept = students.reduce((acc, student) => {
        const dept = student.department;
        if (!acc[dept]) {
            acc[dept] = [];
        }
        acc[dept].push({ id: student.id, name: student.name, gpa: student.gpa });
        return acc;
    }, {});
    
    res.json({
        success: true,
        data: groupedByDept,
        totalStudents: students.length
    });
});

// API: Get individual student GPA by student ID
app.get('/api/students/gpa/:studentId', (req, res) => {
    const student = students.find(s => s.id === req.params.studentId);
    
    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student with ID ${req.params.studentId} not found`
        });
    }
    
    res.json({
        success: true,
        data: {
            id: student.id,
            name: student.name,
            department: student.department,
            gpa: student.gpa
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});