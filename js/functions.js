function checkMeetingAvailability(startWork, endWork, startMeeting, meetingDuration) {

  function timeToMinutes(time){
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  startWork = timeToMinutes(startWork)
  endWork = timeToMinutes(endWork)

  startMeeting = timeToMinutes(startMeeting)
  const endMeeting = startMeeting + meetingDuration

  //console.log(endMeeting <= endWork && startMeeting >= startWork)"

  return endMeeting <= endWork && startMeeting >= startWork

}

checkMeetingAvailability('08:00', '17:30', '14:00', 90); // true
checkMeetingAvailability('8:0', '10:0', '8:0', 120);     // true
checkMeetingAvailability('08:00', '14:30', '14:00', 90); // false
checkMeetingAvailability('14:00', '17:30', '08:0', 90);  // false
checkMeetingAvailability('8:00', '17:30', '08:00', 900); // false



