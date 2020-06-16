// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Set;

public final class FindMeetingQuery {
  ArrayList<TimeRange> meetingTimes = new ArrayList<TimeRange>();
  
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // Initialize time range for the whole day 
    meetingTimes.add(TimeRange.WHOLE_DAY);
    
    // Brute force: (todo: optimize)
    // Go through the event collections
    // For each attendee at the event
        // Check if attendee is an attendee of the meeting
            // If yes, remove that time block
    // Return the remaining time ranges that are longer than duration
    for (Event event : events) {
      Set<String> attendees = event.getAttendees();
      for (String attendee : attendees) {
        if (request.getAttendees().contains(attendee)) {
          removeTimeRange(event.getWhen());
        }
      }
    }

    ArrayList<TimeRange> validMeetingTimes = new ArrayList<TimeRange>();

    for (TimeRange time : meetingTimes) {
      if (time.duration() >= request.getDuration()) {
        validMeetingTimes.add(time);
      }
    }
    return validMeetingTimes;
  }

  private void removeTimeRange(TimeRange eventTime) {
    // Removing a time block:
      // Iterate through the collection
        // If timerange contains the block to remove -- check case (todo: confirm that these are exhaustive)
          // |-----|
          //   |--|
          // Case 1: start and end of remove are both within the curr_time
            // Replace the current item with two: current start to start of remove and end of remove to end
          
            // |------|    |------|
          // |--|      |--|
          // Case 2: end of remove is within the curr_time
            // Replace current item with end of remove to c_end
          
            // |------|    |------| |----|
          //     |--|          |----|
          // Case 3: start of remove is within the curr_time:
            // Replace current item with c_start to r_beginning
          
            // |-----|
          // |---------|
          // Case 4: remove contains curr time range
            // Remove current time

    int i = 0;
    while (i < meetingTimes.size()) {
      TimeRange currTimeRange = meetingTimes.get(i);
      if (currTimeRange.overlaps(eventTime)) {
        if (currTimeRange.contains(eventTime)) {
          meetingTimes.set(i, TimeRange.fromStartEnd(currTimeRange.start(), eventTime.start(), false));
          meetingTimes.add(i + 1, TimeRange.fromStartEnd(eventTime.end(), currTimeRange.end(), false));
        }

        else if (currTimeRange.contains(eventTime.end())) {
          meetingTimes.set(i, TimeRange.fromStartEnd(eventTime.end(), currTimeRange.end(), false));
        }

        else if (currTimeRange.contains(eventTime.start())) {
          meetingTimes.set(i, TimeRange.fromStartEnd(currTimeRange.start(), eventTime.start(), false));
        }

        else {
          // must be that remove contains current time range
          meetingTimes.set(i, TimeRange.fromStartDuration(currTimeRange.start(), 0));
        }
      }
      i++;
    }
  }
}
