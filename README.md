# 📄 Google Docs Change Tracker Script

This Google Apps Script monitors a shared Google Doc for newly added lines and emails those updates to all users who have access to the document (viewers, commenters, editors, and the owner). All recipients are BCC’d to preserve privacy.

---

## 📜 License

This project is licensed under the MIT License.  
© 2025 Romel P & ChatGPT

---

## 🙌 Attribution

Developed as a paired programming project with ChatGPT.  
Collaborative development documented in `Development_Notes.md`.

---

## ✨ Features

- ✅ Automatically detects and tracks new lines in the document
- ✅ Sends update emails to collaborators when changes are found
- ✅ Formats new content as a bullet list
- ✅ Includes a link to the Google Doc in the notification
- ✅ Logs activity including timestamps, detected changes, and recipients
- ✅ Uses Eastern Time (EST/EDT) and 12-hour format in logs

---

## 🛠️ Setup Instructions

1. Open your target Google Document.
2. Click on Extensions → Apps Script.
3. Replace any starter code with the contents of `Code.gs`.
4. Save the script file.
5. Set a time-driven trigger (for example, every 8 hours):
   - Go to Triggers (⏰ icon in left sidebar)
   - Add a trigger for the `checkDocAndEmailChanges` function
   - Choose event type: Time-driven → Hour timer → Every 8 hours (or as needed)

---

## 📬 How It Works

Each time the script runs:

1. It reads the entire text of the Google Doc.
2. It compares the current text to a previously saved version.
3. If new lines are detected:
   - Formats the new content into a bullet list.
   - Extracts a list of all users with access to the document.
   - Sends a summary email to those users using BCC.
   - Saves the current version of the document for future comparison.

---

## 🔍 Accessing Logs

To troubleshoot or observe script execution:

1. Open the script editor (via Extensions → Apps Script).
2. In the top menu, select View → Logs or press `Ctrl + Enter` / `Cmd + Enter`.
3. Alternatively, go to the Execution Log (clock icon on the left).
4. You’ll see:
   - Run timestamp (Eastern Time)
   - Count and content of new lines
   - Email addresses of recipients grouped by role

Example log output:
```
Script run at: 2025-05-19 9:23:41 AM EDT

🔢 New lines detected: 3

📬 Number of recipients: 7
```
