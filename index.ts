
import { createStudent } from "./src/domain/entities/studentEntity";
import { createEnrollment } from "./src/domain/entities/enrollmentEntity";
import { createCourse } from "./src/domain/entities/courseEntity";

import { v4 as uuidv4 } from "uuid";

function logError(testName: string, error: unknown) {
  if (error instanceof Error) {
    console.log(`${testName} failed: ${error.message}`);
  } else {
    console.log(`${testName} failed: Unknown error`);
  }
}

const id = uuidv4();
console.log("running the application ... ", id);

// Student Tests
try {
  const student0 = createStudent(
    "STU930842",
    "Job Bohnson",
    "jobbohnson@gmail.com",
    4,
  );
} catch (error) {
  logError("student0", error);
}

try {
  const student1 = createStudent(
    "-1",
    "Bob Johnson",
    "bobjohnson@gmail.com",
    1,
  );
} catch (error) {
  logError("student1", error);
}

try {
  const student2 = createStudent(
    "STU123456",
    "Bob Johnson",
    "bobjohnsongmail.com",
    1,
  );
} catch (error) {
  logError("student2", error);
}

try {
  const student3 = createStudent(
    "STU123456",
    "Bob Johnson",
    "bobjohnson@gmail.com",
    500,
  );
} catch (error) {
  logError("student3", error);
}

// Course Tests
try {
  const course0 = createCourse("CS101", "Intro to Computer Science", 5, 150);
} catch (error) {
  logError("course0", error);
}

try {
  const course1 = createCourse("Z9", "Intro to Computer Science", 5, 150);
} catch (error) {
  logError("course1", error);
}

try {
  const course2 = createCourse("CS101", "Intro to Computer Science", 20, 150);
} catch (error) {
  logError("course2", error);
}

try {
  const course3 = createCourse("CS101", "Intro to Computer Science", 5, 500);
} catch (error) {
  logError("course3", error);
}

// Enrollment Tests
try {
  const enrollment0 = createEnrollment(
    "ENR-000000",
    "STU930842",
    "CS101",
    "Fall 2026",
  );
} catch (error) {
  logError("enrollment0", error);
}

try {
  const enrollment1 = createEnrollment(
    "ERN-000000",
    "STU930842",
    "CS101",
    "Fall 2026",
  );
} catch (error) {
  logError("enrollment1", error);
}

try {
  const enrollment2 = createEnrollment(
    "ENR-000000",
    "STU9",
    "CS101",
    "Fall 2026",
  );
} catch (error) {
  logError("enrollment2", error);
}

try {
  const enrollment3 = createEnrollment(
    "ENR-000000",
    "STU930842",
    "F3",
    "Fall 2026",
  );
} catch (error) {
  logError("enrollment3", error);
}

try {
  const enrollment4 = createEnrollment(
    "ENR-000000",
    "STU930842",
    "CS101",
    "Splinter 6",
  );
} catch (error) {
  logError("enrollment4", error);
}


import { enrollStudentInCourse } from "./src/domain/entities/factoryFunctions";

console.log("=== TEST 1: Valid Enrollment ===");
try {
    const student = createStudent("STU123456", "Carla", "carla@gmail.com", 0);
    const course1 = createCourse("CS101", "Intro to CS", 3, 50);
    const course2 = createCourse("MATH101", "Calculus", 4, 50);

    enrollStudentInCourse(student, course1, "Fall2024");
    console.log(`✓ Enrolled in ${course1.code}. Credits: ${student.enrolledCredits}`);

    enrollStudentInCourse(student, course2, "Fall2024");
    console.log(`✓ Enrolled in ${course2.code}. Credits: ${student.enrolledCredits}`);
} catch (error) {
    console.log(`✗ Error: ${error}`);
}

console.log("\n=== TEST 2: Exceed 18 Credit Limit ===");
try {
    const student = createStudent("STU654321", "John", "john@gmail.com", 0);
    const course1 = createCourse("CS101", "Intro to CS", 6, 50);
    const course2 = createCourse("MATH101", "Calculus", 6, 50);
    const course3 = createCourse("ENG201", "Literature", 6, 50);
    const course4 = createCourse("PHYS101", "Physics", 6, 50);

    enrollStudentInCourse(student, course1, "Fall2024");
    console.log(`✓ Enrolled in ${course1.code}. Credits: ${student.enrolledCredits}`);

    enrollStudentInCourse(student, course2, "Fall2024");
    console.log(`✓ Enrolled in ${course2.code}. Credits: ${student.enrolledCredits}`);

    enrollStudentInCourse(student, course3, "Fall2024");
    console.log(`✓ Enrolled in ${course3.code}. Credits: ${student.enrolledCredits}`);

    enrollStudentInCourse(student, course4, "Fall2024");
    console.log(`✓ Enrolled in ${course4.code}. Credits: ${student.enrolledCredits}`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 3: Course Capacity Full ===");
try {
    const student1 = createStudent("STU111111", "Alice", "alice@gmail.com", 0);
    const student2 = createStudent("STU222222", "Bob", "bob@gmail.com", 0);
    const course = createCourse("CS101", "Intro to CS", 3, 1);

    enrollStudentInCourse(student1, course, "Fall2024");
    console.log(`✓ Student 1 enrolled. Course capacity: ${course.enrolledCount}/${course.capacity}`);

    enrollStudentInCourse(student2, course, "Fall2024");
    console.log(`✓ Student 2 enrolled. Course capacity: ${course.enrolledCount}/${course.capacity}`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 4: Invalid Student ID ===");
try {
    const student = createStudent("INVALID", "Test", "test@gmail.com", 0);
    console.log(`✓ Student created`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 5: Invalid Course Code ===");
try {
    const course = createCourse("INVALID123", "Test", 3, 50);
    console.log(`✓ Course created`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 6: Invalid Email ===");
try {
    const student = createStudent("STU333333", "Charlie", "invalid-email", 0);
    console.log(`✓ Student created`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 7: Invalid Credits Value ===");
try {
    const course = createCourse("CS101", "Intro to CS", 5, 50);
    console.log(`✓ Course created`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}

console.log("\n=== TEST 8: Invalid Course Capacity ===");
try {
    const course = createCourse("CS101", "Intro to CS", 3, 250);
    console.log(`✓ Course created`);
} catch (error) {
    console.log(`✗ Expected failure: ${error}`);
}
