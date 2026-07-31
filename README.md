# 📲 NFC Student Attendance System

An NFC-based student attendance system built with **Google Apps Script, Google Sheets, HTML, CSS, and JavaScript**. This web application allows authorized staff members to quickly check students in and out by scanning NFC tags, automatically updating attendance records and maintaining a complete audit log.

---

## 📖 Overview

This project was developed to streamline student attendance during a multi-day summer STEM camp.

Each student receives an NFC tag containing a unique URL. When a staff member scans the tag with a smartphone, a mobile-friendly web interface opens displaying the student's information and attendance status. Staff can then check the student in or out with a single tap.

The system automatically:

- Updates the student's attendance status
- Logs every attendance action
- Records the staff member who performed the scan
- Timestamps every check in and check out
- Displays live attendance dashboards by team

---

## ✨ Features

- 📲 NFC tag scanning
- 👥 Authorized staff login using Google accounts
- ✅ One-tap Check In / Check Out
- 🎨 Color-coded attendance statuses
- 📱 Mobile-friendly interface
- 📊 Live attendance dashboards
- 📝 Staff activity logging
- ⏱ Timestamped attendance history
- 🚫 Prevents unauthorized access

---

## 🛠 Technologies Used

- Google Apps Script
- Google Sheets
- HTML5
- CSS3
- JavaScript
- Google Workspace

---

# System Architecture

```
NFC Tag
     │
     ▼
Google Apps Script Web App
     │
     ▼
Student Lookup
     │
     ▼
HTML Attendance Interface
     │
     ▼
Check In / Check Out
     │
     ▼
Google Sheets
     ├── Students
     ├── AttendanceLog
     ├── CheckIN Dashboard
     └── CheckOUT Dashboard
```

---

# Google Sheets Structure

## Students

Stores the master student roster.

| Column | Description |
|----------|-------------|
| StudentID | Unique student identifier |
| Name | Student name |
| Grade | Grade level |
| Team | Team color |
| Status | Current attendance status |
| Notes | Optional staff notes |
| NFC_ID | Student NFC tag URL |

---

## AttendanceLog

Stores every attendance event.

| Column | Description |
|----------|-------------|
| Timestamp | Date and time |
| StudentID | Student ID |
| Name | Student name |
| Action | Checked In / Checked Out |
| Staff | Staff email |

---

## CheckIN Dashboard

Displays students who have not yet arrived.

Features:

- Organized by team
- Live attendance counts
- Current attendance status
- Quickly identifies missing students

---

## CheckOUT Dashboard

Displays students currently checked in and awaiting pickup.

---

# How It Works

1. Staff scans an NFC tag.
2. The Google Apps Script web app opens.
3. Staff authentication is verified.
4. Student information is retrieved.
5. Student details are displayed.
6. Staff selects:

- ✅ Check In
- 🔴 Check Out

7. The student's status is updated.
8. The action is recorded in the Attendance Log.
9. Dashboards update automatically.

---

# User Interface

The mobile interface displays:

- Student Name
- Grade
- Team
- Current Attendance Status
- Check In button
- Check Out button

The background color changes depending on attendance status:

| Status | Color |
|---------|-------|
| Not Arrived | Gray |
| Checked In | Green |
| Checked Out | Red |

---

# Security

Only authorized Google accounts may use the system.

```javascript
const AUTHORIZED_USERS = [
    "authorized@email.com"
];
```

Unauthorized users receive an **Access Denied** page.

---

# Screenshots

## Students Sheet

*Insert screenshot here*

---

## Check In Dashboard

*Insert screenshot here*

---

## Check Out Dashboard

*Insert screenshot here*

---

## Mobile Attendance Interface

*Insert screenshot here*

---

# Demo

### Screen Recording

Insert your GIF or screen recording here.

Example:

```
assets/demo.gif
```

or

```
https://github.com/.../assets/...
```

---


# What I Learned

Through this project I gained experience with:

- Building web applications using Google Apps Script
- Integrating HTML, CSS, and JavaScript with Google Sheets
- Mobile-first interface design
- Spreadsheet automation
- NFC technology
- User authentication
- Data logging and auditing
- Real-world workflow automation

---

# Repository Structure

```
Attendance-System/

│
├── Code.gs
├── index.html
├── README.md
│
├── assets/
│   ├── dashboard.png
│   ├── students-sheet.png
│   ├── mobile-ui.png
│   └── demo.gif
│
└── LICENSE
```

---

# Author

**Catherine Lacala**

Software Engineering Student  
University of Illinois Chicago

