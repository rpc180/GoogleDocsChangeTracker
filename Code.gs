/**
📄 Google Docs Change Tracker
Tracks changes in a Google Doc, compares the new content with a cached version,
and emails all collaborators (viewers, commenters, editors, and owner) with the new lines.
Uses the active document contributors to populate the recipient list
🔧 Built in collaboration with ChatGPT and Romel P
🗓️ Created: 2025
📜 License: MIT (see LICENSE file)
 */

/**
 * 📌 Helper: Get all users with access to the active document
 */
function getPeopleWithAccessToActiveDoc() {
  const docId = DocumentApp.getActiveDocument().getId();
  const file = DriveApp.getFileById(docId);

  const owner = file.getOwner();
  const viewers = file.getViewers();
  const editors = file.getEditors();
  const commenters = file.getCommenters?.() || [];

  // Log each group
  Logger.log(`👑 Owner: ${owner.getEmail()}`);
  Logger.log(`👀 Viewers (${viewers.length}):\n${viewers.map(u => u.getEmail()).join("\n")}`);
  Logger.log(`✏️ Editors (${editors.length}):\n${editors.map(u => u.getEmail()).join("\n")}`);
  Logger.log(`💬 Commenters (${commenters.length}):\n${commenters.map(u => u.getEmail()).join("\n")}`);


  const emails = new Set();
  viewers.forEach(user => emails.add(user.getEmail()));
  editors.forEach(user => emails.add(user.getEmail()));
  commenters.forEach(user => emails.add(user.getEmail()));
  emails.add(owner.getEmail()); // Include the owner

  return Array.from(emails);
}

/**
 * 📌 Helper: Format new lines as bullet list
 */
function formatAsBulletList(lines) {
  return lines.map(line => `• ${line}`).join("\n");
}

/**
 * 📌 Helper: Convert Timestamps to Eastern Standard
 */
function getEasternTimeString() {
  const now = new Date();
  return Utilities.formatDate(now, "America/New_York", "yyyy-MM-dd h:mm:ss a z");
}

/**
 * 📌 Main: Check for changes and send email if needed
 */
function checkDocAndEmailChanges() {
  Logger.log(`🕒 Script run at: ${getEasternTimeString()}`);
  const doc = DocumentApp.getActiveDocument();
  const docId = doc.getId();
  const body = doc.getBody();
  const currentText = body.getText();

  const props = PropertiesService.getDocumentProperties();
  const lastText = props.getProperty("lastText") || "";

  const currentLines = currentText.split("\n").map(line => line.trim()).filter(Boolean);
  const lastLines = lastText.split("\n").map(line => line.trim()).filter(Boolean);

  const newLines = currentLines.filter(line => !lastLines.includes(line));

  // Uncomment below lines to log current and cached content for comparison
  // Logger.log(`📄 Current Lines:\n${currentLines.join("\n")}`);
  // Logger.log(`📄 Last Lines:\n${lastLines.join("\n")}`);

  if (newLines.length > 0) {
    const bulletList = formatAsBulletList(newLines);
    const recipients = getPeopleWithAccessToActiveDoc();
    const link = doc.getUrl();
    Logger.log(`🔢 New lines detected: ${newLines.length}\n${newLines.join("\n")}`);
    Logger.log(`📬 Number of recipients: ${recipients.length}`);

    MailApp.sendEmail({
      to: "undisclosed-recipients@subscriberlist.org",
      bcc: recipients.join(","),
      subject: "📄 New Updates in the Shared Google Doc",
      body: `The document "${doc.getName()}" has updates.\n\nNew lines:\n\n${bulletList}\n\nView it here: ${link}`
    });

    props.setProperty("lastText", currentText);
  } else {
    Logger.log("No new lines detected — no email sent.");
  }
}
