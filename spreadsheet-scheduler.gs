function exportEvents() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var headerRows=1;
  var range = sheet.getDataRange();
  var data = range.getValues();
  var calId = 'yourCalID';
  var cal = CalendarApp.getCalendarById(calId);
  for (i=0; i<data.length; i++) {
    if (i < headerRows) continue; // skip header row
    var row = data[i];
    var date = new Date(row[0]); // first column
    var title = row[1]; // second column
    var guest = row[2]; // third column
    var id = row[3]; // fourth column
    // check if the event exists already, then update it if it does
    try {
      var event = cal.getEventSeriesById(id);
    }
    catch (e) {
      // do nothing - we are just checking for a duplicate
    }
    if (!event) {
      // Creates an all-day event for the Woodstock festival (August 15th to 17th) and logs the ID.
        var newEvent = cal.createAllDayEvent(title, new Date(date), {guests: guest, sendInvites: true}).getId();
      // Logger.log('Event ID: ' + event.getId());
      row[6] = newEvent; // update the data array with the event ID
    }
    else {
      event.setTitle(title);
      event.addGuest(guest);
    }
    debugger;
  }
}