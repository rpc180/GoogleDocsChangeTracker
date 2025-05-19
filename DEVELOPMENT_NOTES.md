🛠️ Development Notes: Google Docs Change Tracker Script

Overview

This script monitors a shared Google Document, detects newly added lines, and emails those changes to all collaborators (viewers, editors, commenters, and owner). The script was developed as part of a collaborative exercise between Romel P and ChatGPT.

Development Timeline Summary

🎯 Goals

Track line-level changes in a Google Doc

Automatically email updates to collaborators

Store and compare previous document state

Display readable bullet lists in the email

Maintain best practices and use helper functions for modularity

🔧 Key Features Implemented

Use of DocumentApp.getActiveDocument() to access the current document

Storage and retrieval of last document state using PropertiesService

Filtering and trimming logic using .split, .map, .trim, and .filter

Extraction of collaborators using DriveApp.getFileById()

Includes viewers, editors, commenters, and owner

Logging execution timestamps in Eastern Time (12-hour format)

Output of metrics like number of new lines and recipients

Email sent using MailApp.sendEmail with all recipients in BCC

URLs and bullet lists are formatted for clear readability

📅 Development Milestones & Enhancements

🕒 2025-05-14

Initial concept and goals established

Decided to use DocumentApp.getActiveDocument() to tie script to current doc

🕒 2025-05-15

Implemented change detection via comparison of current and previous document lines

Introduced logging with Logger.log() for timestamps and debugging values

Logger.log("Script run at: %s", getEasternTimeString());

🕒 2025-05-16

Added helper function to extract viewers, editors, commenters, and owner:

function getPeopleWithAccessToActiveDoc() { ... }

Introduced .map(u => u.getEmail()) and .join("\n") to format logs

Logged number of recipients:

Logger.log("📬 Number of recipients: %s", recipients.length);

🕒 2025-05-17

Integrated formatted bullet list:

function formatAsBulletList(lines) { ... }

Updated email body with link to document and bullet points of changes

🕒 2025-05-18

Adjusted time formatting for EST/EDT and 12-hour clock:

Utilities.formatDate(now, "America/New_York", "yyyy-MM-dd h:mm:ss a z");

Resolved Gmail bounceback issue with BCC field usage

📘 Script Composition

The script uses the following helper functions:

getPeopleWithAccessToActiveDoc() – Retrieves all collaborators

formatAsBulletList(lines) – Formats an array of strings as bullet points

getEasternTimeString() – Formats current time to Eastern Time in readable format

The main execution function:

checkDocAndEmailChanges() – Logs changes, prepares and sends email

🧪 Debugging Techniques Used

Logger.log() was used to output:

Timestamp of each execution

Number and contents of new lines

List of recipient email addresses categorized by role

Use of breakpoints to pause and inspect variables

Discussion of split, map, trim, and filter operations

Consideration of script execution limits and batching

📋 Noteworthy Challenges and Resolutions

Gmail bouncebacks when using undisclosed-recipients@example.com

Resolved by using a placeholder To: and real addresses in BCC

Ensuring all user types (including owner) are captured

Formatting bullet lists and hyperlinks in plain text email

Customizing script time zone display and 12-hour formatting

🔐 Permissions Note

Google Apps Script APIs (DriveApp, MailApp) respect permissions of the account executing the script.

The script uses getActiveDocument(), so it runs in the context of the currently open document.

✅ Outcome

A working, modular, well-logged Google Apps Script that:

Detects newly added lines

Emails updates to all collaborators

Supports reuse and modification for related workflow automations

🧾 Licensing & Attribution

Script licensed under MIT License

Attribution in script header:

📌 Developed with vibe coding by Romel P and ChatGPT

For the complete source code, see: /Code.gs

