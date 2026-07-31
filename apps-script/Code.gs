/** 
  NFC Attendance Tracking System
  --------------------------------
  Developed using Google Apps Script and Google Sheets.
 
  Features:
  • NFC tag-based student check-in/check-out
  • Staff authentication using Google accounts
  • Live attendance status updates
  • Automatic attendance logging with timestamps
  • Student lookup by unique NFC ID
 
  Author: Catherine Lacala
  GitHub: https://github.com/CatherineLacala
 */


// List of staff members who are authorized to use the attendance system.
// If a user's Google account is not listed here, they will be denied access.
const AUTHORIZED_USERS = [
 "authorized.user@example.com"
];


/**
  Main entry point for the web application.
  Triggered whenever an NFC tag URL is opened.
 
  Workflow:
  1. Read the student ID from the URL parameter.
  2. Verify that the user is an authorized staff member.
  3. Retrieve the student's information from the spreadsheet.
  4. Pass the student data to the HTML interface.
 */
function doGet(e) {

  // Read the student ID from the URL.
  const studentId = e.parameter.student;

  // Stop if no student ID was provided.
  if (!studentId) {
    return HtmlService.createHtmlOutput("Missing student ID");
  }

  // Getting the Google account of the authorized person scanning the NFC tag.
  const email = Session.getActiveUser().getEmail();

  // Preventing unauthorized users from accessing the attendance system.
  if (!AUTHORIZED_USERS.includes(email)) {
    return HtmlService.createHtmlOutput("Access Denied");
  }

  // Looking up the student in the Students sheet.
  const student = getStudent(studentId);

  // Displaying error if student ID does not exist.
  if (!student) {
    return HtmlService.createHtmlOutput("Student not found");
  }

  // Loading the HTML page and sending the student's information to it.
  const template = HtmlService.createTemplateFromFile("index");

  template.student = student;
  template.email = email;

  // Returning the completed webpage.
  return template.evaluate()
    .setTitle("Attendance System")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
  Searches the Students sheet for a matching student ID.
 
  @param {string} studentId - Student ID scanned from the NFC tag.
  @returns {Object|null} Student information if found, otherwise null.
 */
function getStudent(studentId) {

  // Open the Students worksheet.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  
  // Reading all student records into memory.
  const data = sheet.getDataRange().getValues();

  // Skipping row 1 because it contains column headers.
  for (let i = 1; i < data.length; i++) {

    // Comparing each Student ID to the scanned ID.
    if (data[i][0] === studentId) {

      // Returning the student's information as an object.
      // Using an object making the HTML template easier to read.
      return {
        row: i + 1,             // Spreadsheet row number
        id: data[i][0],         // Student ID
        name: data[i][1],       // Student name
        grade: data[i][2],      // Grade level
        team: data[i][3],       // Team color/group
        status: data[i][4]      // Current attendance status
      };
    }
  }

  // Student ID was not found.
  return null;
}


/**
  Updates a student's attendance status and records the event.
 
  This function:
  1. Finds the student.
  2. Updates their status in the Students sheet.
  3. Logs the attendance event with a timestamp and staff member.

  @param {string} studentId - Student ID scanned from the NFC tag.
  @param {string} action - Attendance status (e.g. "Checked In", "Checked Out").
 */
function updateStatus(studentId, action) {

  // Open the required worksheets.
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Students");
  const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AttendanceLog");

  // Retrieve the student's information.
  const student = getStudent(studentId);

  // Exit if the student doesn't exist.
  if (!student) return;

  // Get the email of the staff member(authorized user) performing the scan.
  const staffEmail = Session.getActiveUser().getEmail();

  // Update the student's current attendance status.
  // Column 5 = Status
  sheet.getRange(student.row, 5).setValue(action);

  // Record the attendance event in the AttendanceLog sheet.
  // This creates a complete audit trail showing:
  // - Timestamp
  // - Student ID
  // - Student Name
  // - Action performed
  // - Staff member who scanned the NFC tag
  logSheet.appendRow([
    new Date(),
    student.id,
    student.name,
    action,
    staffEmail
  ]);
}
