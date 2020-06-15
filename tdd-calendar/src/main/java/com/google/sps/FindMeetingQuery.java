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

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // throw new UnsupportedOperationException("TODO: Implement this method.");
    // Brute force:
    // Go through the event collections
    // For each attendee at the event
        // Check if attendee is an attendee of the meeting
            // If yes, remove that time block
    // Return the remaining time ranges

    // Initialize time range for the whole day 
    // Removing a time block:
        // Iterate through the collection
            // If timerange contains the block to remove:
                // Case 1: remove block is right in the middle
                    // Replace the current item with two: current start to start of remove and end of remove to end
                // Case 2: remove block is at the beginning:
                    // Replace current item with end of remove to c_end
                // Case 3: remove block is at the end:
                    // Replace current item with c_start to r_beginning
    ArrayList<TimeRange> meetingTimes = new ArrayList<TimeRange>();
    meetingTimes.add(TimeRange.WHOLE_DAY);
    return meetingTimes;
  }
}
