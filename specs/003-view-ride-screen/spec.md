# Feature Specification: View Ride Screen

**Feature Branch**: `003-view-ride-screen`

**Created**: 2026-05-12

**Status**: Draft

**Input**: User description: "Create the view ride screen as the primary app view, with a persistent map and state-dependent ride content in an adjustable sheet. Support pending, confirmed, driving to pickup, dropoff, and completed ride states; show flight information only when relevant; use the provided prototype references for pending, confirmed agenda, and completed post-ride experiences."

## Clarifications

### Session 2026-05-12

- Q: Which ride actions should be durable in this feature? → A: Core transitions only: save ride status changes for start pickup/start dropoff/end trip; messaging/navigation remain intents or handoffs.
- Q: Should completed-ride notes and quick tags persist in this feature? → A: Show note/tag UI only as a local draft; persistence comes later.
- Q: What pending ride decision should this screen support? → A: Driver can edit the quote before confirming.

## Constitution Alignment *(mandatory)*

- **Driver business value**: Gives the driver one primary place to understand, operate, and complete a ride while preserving their control over quote, schedule, route, client contact, and post-ride relationship follow-up.
- **Concierge reliability**: Keeps route, timing, flight, client, and one-tap ride actions visible at the moment they matter so the driver can deliver the calm airport pickup experience without switching between tools.
- **Low-touch accessibility**: Uses a stable map-plus-sheet structure, plain state labels, large primary actions, and concise content so drivers can act quickly before, during, and after a ride.
- **Relationship memory**: Shows client history and preferences before the ride, then prompts for notes, tags, and retention decisions after completion so the driver can strengthen recurring client relationships.
- **FSD placement (implementation hint)**: Add a dedicated ride-view page slice that composes lower-layer ride, rider, pricing, route, and optional flight models; route files should only compose the page, and cross-layer imports should continue to flow downward.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Operate from a consistent ride workspace (Priority: P1)

As a HUM driver, I want every ride state to share a clear map and ride-content workspace so I can orient myself immediately without relearning the screen as the ride progresses.

**Why this priority**: This is the primary view of the app. The persistent map and adjustable ride sheet are the foundation for every state-specific action.

**Independent Test**: Can be tested by opening a ride in each supported state and confirming the map remains visible, the sheet defaults to a balanced map/content split, and the driver can reveal more map or more ride content with a swipe.

**Acceptance Scenarios**:

1. **Given** a driver opens any ride, **When** the ride view loads, **Then** the screen shows the map and a ride-content sheet together with an approximately equal default split.
2. **Given** the ride-content sheet is visible, **When** the driver swipes down, **Then** more of the map is visible while essential ride actions remain reachable.
3. **Given** the ride-content sheet is visible, **When** the driver swipes up, **Then** more ride details are visible while retaining route context.
4. **Given** a ride changes state, **When** the view refreshes to the new state, **Then** the map and sheet structure remains consistent while the sheet content and primary action update.

---

### User Story 2 - Review and quote a pending ride (Priority: P1)

As a driver evaluating a pending ride, I want an overview of the client, route, suggested quote, editable quote, and platform comparison so I can decide whether the ride fits my business and confirm the ride at the right price.

**Why this priority**: Pending rides are where the driver exercises pricing control and decides whether to commit.

**Independent Test**: Can be tested by opening a pending ride with route, rider, pricing, and optional flight data, editing the quote, and confirming the ride without requiring active-trip details.

**Acceptance Scenarios**:

1. **Given** a pending ride has pickup and destination locations, **When** the driver opens the ride, **Then** the map previews the pickup-to-destination route.
2. **Given** a pending ride has a suggested quote, **When** the overview is shown, **Then** the suggested quote is presented as the driver-facing recommendation and can be edited before confirmation.
3. **Given** platform comparison pricing is available, **When** the overview is shown, **Then** the platform quote or range is shown near the suggested quote.
4. **Given** platform comparison pricing is unavailable, **When** the overview is shown, **Then** the screen omits the platform comparison without showing empty or misleading copy.
5. **Given** relevant flight data exists for the pending ride, **When** the overview is shown, **Then** concise flight context is included; otherwise flight content is omitted.

---

### User Story 3 - Prepare for a confirmed ride (Priority: P1)

As a driver with a confirmed ride, I want a detailed trip agenda and pre-trip actions so I can prepare the passenger, plan my departure, and start navigation at the right time.

**Why this priority**: Confirmed rides are where HUM encodes the best-practice prep work top drivers do manually today.

**Independent Test**: Can be tested by opening a confirmed ride and verifying the agenda, confirmation action, and route overview are available before the ride becomes active.

**Acceptance Scenarios**:

1. **Given** a confirmed ride is scheduled, **When** the driver opens the ride, **Then** the sheet shows a timeline-style agenda of completed, current, and upcoming preparation steps.
2. **Given** the ride is confirmed, **When** the driver views actions, **Then** the driver can send or review a pre-trip confirmation message suitable for day-before or day-of use.
3. **Given** the driver is ready to leave, **When** the driver chooses to start the ride or navigate to pickup, **Then** the screen offers a clear primary action for starting navigation toward the pickup.
4. **Given** the driver has current-location access, **When** the confirmed ride map loads, **Then** the route overview includes current location, pickup, and destination as a three-waypoint route.
5. **Given** relevant flight data exists, **When** the confirmed agenda is shown, **Then** flight status appears in the preparation context; otherwise it is omitted.

---

### User Story 4 - Navigate active pickup and dropoff legs (Priority: P1)

As a driver in an active ride, I want the screen to prioritize navigation with only the critical contact and state-transition actions so I can keep attention on the road.

**Why this priority**: Active driving states must reduce cognitive load and make the next safe action obvious.

**Independent Test**: Can be tested by opening rides in driving-to-pickup and dropoff states and confirming the map becomes the dominant view with the correct contact and transition controls.

**Acceptance Scenarios**:

1. **Given** the ride state is driving to pickup, **When** the screen loads, **Then** the map and navigation guidance are visually prioritized over secondary ride details.
2. **Given** the ride state is driving to pickup, **When** actions are shown, **Then** the driver can contact the passenger and start the dropoff trip.
3. **Given** the ride state is dropoff, **When** the screen loads, **Then** the map and destination guidance remain visually prioritized.
4. **Given** the ride state is dropoff, **When** actions are shown, **Then** the driver can contact the passenger and end the trip.
5. **Given** flight information was useful before pickup, **When** the ride is active after pickup, **Then** flight content does not crowd out navigation unless it remains directly relevant to the driver's next action.

---

### User Story 5 - Complete the ride and capture relationship value (Priority: P2)

As a driver after completing a ride, I want to see payment, rider context, memorable details, and follow-up actions so I can preserve the relationship and move to my next ride.

**Why this priority**: Completion is where HUM reinforces earnings value and turns the ride into relationship memory.

**Independent Test**: Can be tested by opening a completed ride and confirming the driver can verify payment, add notes or tags, see the HUM service moment, and choose the next follow-up action.

**Acceptance Scenarios**:

1. **Given** a ride is completed, **When** the driver opens the ride, **Then** the screen shows the completed payment amount and concise ride summary.
2. **Given** rider history is available, **When** the completed state is shown, **Then** the driver sees rider identity, ride count, value, and relationship status.
3. **Given** the driver wants to remember the client, **When** the completed state is shown, **Then** the driver can add or review a note and apply quick relationship tags.
4. **Given** the ride included a concierge pickup detail, **When** the completed state is shown, **Then** the screen highlights the HUM moment that made the ride worth remembering.
5. **Given** the driver is done reviewing the ride, **When** actions are shown, **Then** the driver can schedule a return or save and move to the next ride.

---

### Edge Cases

- If a ride has no relevant flight data, the screen must omit flight sections across all states without blank labels or placeholder copy.
- If a ride has partial flight data, the screen must show only verified useful fields and distinguish unknown data from an on-time status.
- If the platform quote is unavailable on a pending ride, the suggested quote must remain visible and the missing comparison must not block the quote decision.
- If current location is unavailable on a confirmed or active ride, the map must still show the known pickup and destination and clearly indicate that live location is unavailable.
- If route preview or navigation data is delayed, the sheet must still show key ride details and offer a retry or recovery path.
- If a pre-trip confirmation or passenger contact action fails, the driver must receive a clear failure message and a retry path.
- If the ride state changes while the driver is viewing the screen, the visible primary action must not conflict with the latest known state.
- If the driver expands the sheet during active navigation, the screen must preserve access to the primary driving action without requiring precise gestures.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a ride view for the supported ride states: pending, confirmed, driving to pickup, dropoff, and completed.
- **FR-002**: The system MUST display a persistent map area and ride-content sheet for every supported ride state.
- **FR-003**: The ride-content sheet MUST default to an approximately equal map/content split and support swipe gestures to reveal more map or more ride content.
- **FR-004**: The system MUST update sheet content, map route display, and primary actions based on the ride's current state.
- **FR-005**: Pending rides MUST present an overview of rider, pickup, destination, suggested quote, editable driver quote, and platform comparison when available.
- **FR-006**: Pending ride maps MUST preview the pickup-to-destination route.
- **FR-007**: Confirmed rides MUST present a timeline-style trip agenda including completed preparation, current reminders, and upcoming ride steps.
- **FR-008**: Confirmed rides MUST provide an action to send or review a pre-trip confirmation message.
- **FR-009**: Confirmed ride maps MUST show a three-waypoint overview from current location to pickup to destination when current location is available.
- **FR-010**: Confirmed rides MUST provide a clear action to start the ride or navigate to pickup.
- **FR-011**: Driving-to-pickup rides MUST prioritize navigation and provide actions to contact the passenger and start the dropoff trip.
- **FR-012**: Dropoff rides MUST prioritize navigation and provide actions to contact the passenger and end the trip.
- **FR-013**: Completed rides MUST show payment amount, ride summary, rider relationship context, local draft note entry or review, quick relationship tags, and follow-up actions.
- **FR-014**: The system MUST show flight information only when relevant flight data exists for the ride and current state.
- **FR-015**: The system MUST omit unavailable optional fields without showing empty labels, filler text, or misleading default values.
- **FR-016**: The system MUST keep the primary state-transition action visible and unambiguous in every ride state.
- **FR-017**: The system MUST provide a passenger contact action in active driving states and in any other state where contacting the passenger is a relevant next step.
- **FR-018**: The system MUST distinguish suggested driver quote, accepted or paid amount, and platform comparison values so drivers do not confuse business guidance with final payment.
- **FR-019**: The system MUST present content in plain language with touch targets suitable for quick use before or during a professional driving workflow.
- **FR-020**: The system MUST handle unavailable location, route, flight, price, and message-send data with recoverable states that preserve the driver's next best action.
- **FR-021**: The system MUST persist core ride status transitions for starting pickup navigation, starting the dropoff leg, and ending the trip; messaging and navigation actions MAY open review, contact, or handoff flows without completing those external actions inside this feature.
- **FR-022**: The system MUST allow the driver to edit the pending ride quote and confirm the ride at the edited quote, saving the confirmed quote with the ride.

### Key Entities *(include if feature involves data)*

- **Ride**: The appointment or active trip being viewed, including current state, type, schedule, pickup, destination, pricing, optional flight context, and completion markers.
- **Rider**: The client or passenger associated with the ride, including identity, contact method, ride history, value, preferences, and relationship status.
- **Route**: The map path and waypoint set relevant to the current ride state, such as pickup-to-destination, current-to-pickup-to-destination, current-to-pickup, or current-to-destination.
- **Pricing Context**: The suggested quote, editable driver quote, platform comparison, accepted amount, or paid amount shown according to ride state.
- **Flight Context**: Optional airport-related timing and arrival details that appear only when relevant to the ride and state.
- **Ride Agenda Item**: A preparation or trip step shown for confirmed rides, including completed confirmations, current reminders, and upcoming pickup actions.
- **Relationship Note**: A local draft or existing post-ride note/tag that helps the driver remember client preferences and follow-up opportunities; new note/tag persistence is out of scope for this feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability review, 90% of drivers can identify the ride state and next primary action within 5 seconds of opening the ride view.
- **SC-002**: In usability review, 90% of drivers can reveal more map or more ride details with one swipe from the default ride view.
- **SC-003**: Drivers can review a pending ride, edit the quote, and confirm the ride with suggested quote and platform comparison visible when available in under 45 seconds.
- **SC-004**: Drivers can send or review the confirmed ride pre-trip confirmation in under 15 seconds.
- **SC-005**: During active pickup or dropoff states, drivers can access passenger contact and the state-transition action with no more than one tap from the default view.
- **SC-006**: Completed ride review lets drivers confirm payment and enter a local draft relationship note or tag in under 45 seconds.
- **SC-007**: Across representative rides with and without flight data, no screen displays blank flight labels, irrelevant flight sections, or placeholder values.
- **SC-008**: At least 90% of test drivers describe the screen as clear enough to use while preparing for or operating a professional airport pickup.

## Assumptions

- The ride view is designed for signed-in HUM drivers using the mobile driver app.
- Existing ride, rider, pricing, route, and optional flight data can be supplied by the app's current or planned driver-owned data model.
- State names may be adapted for driver-facing copy, but the product states remain pending, confirmed, driving to pickup, dropoff, and completed.
- Pending rides support quote editing before confirmation; decline and counteroffer workflows are out of scope for this feature.
- The "dropoff" state represents the active leg after passenger pickup and before trip completion.
- Messaging actions may open a review/send flow rather than sending immediately when message content should be confirmed.
- Navigation may use the app's map experience or hand off to a navigation tool, as long as the driver sees a clear start/navigation action.
- Core ride status transitions are saved by this feature, while message delivery and navigation execution can remain delegated to review or handoff flows.
- Completed-ride note and tag entry can remain a local draft in this feature; durable relationship-note persistence will be handled by a later CRM or notes feature.
- Cancelled, no-show, reassigned, and posse handoff flows are out of scope for this view unless they are introduced by a later ride-state feature.
