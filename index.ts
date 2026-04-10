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