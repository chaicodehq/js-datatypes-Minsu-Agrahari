/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 * 
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 * 
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 * 
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  // Your code here

  if(typeof student !== "object" || student === null) return null;
  if(typeof student.name !== "string" || student.name.trim() === "") return null;
  if(typeof student.marks !== "object" || student.marks === null) return null;

  let entries = Object.entries(student.marks);
  if(entries.length === 0) return null;


  // check for marks keys
  // let keys = Object.key(student.marks);
  // let iskey = keys.filter(
  //   (key) => typeof key !== "string" 
  //             key === null ||
  //             key === " "
  //   );
  // if(iskey.length > 0) return null;

  // check for marks values
  let mark = Object.values(student.marks);
  let ismark = mark.filter(
    (sub_mark) => typeof sub_mark !== "number" ||
                  sub_mark === null ||
                  sub_mark>100 ||
                  sub_mark<0 
    );
  
  if(ismark.length > 0) return null;

  let scoredMarks = mark.reduce((acc, currVal) => {
    return acc+currVal
  }, 0)

  let totalMarks = mark.length*100;
  let percentage = (scoredMarks /totalMarks)*100;
  percentage = parseFloat(percentage.toFixed(2));

  let grade = null;
  if(percentage >= 90) grade = "A+";
  else if(percentage >= 80) grade = "A";
  else if(percentage >= 70) grade = "B";
  else if(percentage >= 60) grade = "C";
  else if(percentage >= 40) grade = "D";
  else grade = "F";


  let scores = analysisMarks(marks);

  return { name: student.name,
            totalMarks: scoredMarks,
            percentage: percentage, 
            grade: grade, 
            highestSubject: scores.highest.subject, 
            lowestSubject: scores.lowest.subject, 
            passedSubjects: scores.passed, 
            failedSubjects: scores.failed, 
            subjectCount: marks.length 
          };
}

function analysisMarks(marks){

  let highestSubject = "";
  let highestScore = -Infinity;

  let lowestSubject = "";
  let lowestScore = Infinity;

  let passed = [];
  let failed = [];

  for(let subject in marks){
    let score = marks[subject];

    // highest
    if(score > highestScore){
      highestScore = score;
      highestSubject = subject;
    }

    // lowest
    if (score < lowestScore) {
      lowestScore = score;
      lowestSubject = subject;
    }

    // pass/fail
    if (score >= 40) {
      passed.push(subject);
    } else {
      failed.push(subject);
    }
  
    return {
      highest: { subject: highestSubject, score: highestScore },
      lowest: { subject: lowestSubject, score: lowestScore },
      passed,
      failed
    };
  }
}
