# Feature Specification: Driver Home Dashboard

**Feature Branch**: `002-driver-home-dashboard`

**Created**: 2026-05-12

**Status**: Draft

**Input**: User description: "build the home page of the app. use the mockup / prototype resources/prototypes/screens-1.jsx:6-86 as a reference for the design and what needs to be displayed. the page consists of a stat card and the drivers schedule. the stat card should have todays earnings, this weeks earnings, and ride goals (e.g. 7/10 rides this week). the schedule is a list of rides for the day. each ride has different states: pending, confirmed, driving to appointment, driving to destination, and completed. these states inform what data is displayed on the drive card on the home page. some drives will have extra information such as a flight number associated with it. this type of drive will display flight info such as arrivial time, any delays, airport, flight number, gate and terminal. other drives may just have a fixed pickup time, pickup address. all drives will have a drop-off address, associated rider, and quote/pricing information. you'll need to create new supabase tables for flight data, rider data, ride data, stat card data, and possibly more tables as you see fit. the database is currently empty as we have only setup authentication so far. the rider table should include at least a first and last name, total rides, lifetime value, list of preferences, phone number. the pricing table should include a quoted number, accepted number, and platform average (two numbers). the scope of this feature is to build out the data shape in the backend and display it on the front end. we will handle data creation at a later time. keep in mind we should rely on react native reusables for as many components as possible and only creating custom components when needed. use resources/hum_driver_perspective.md as context for what this home screen is attempting to accomplish"

## Constitution Alignment *(mandatory)*

- **Driver business value**: Gives the driver an at-a-glance business dashboard showing today's schedule, current earnings, weekly earnings, and ride-goal progress so they can run the day like a private driving business rather than react to scattered messages.
- **Concierge reliability**: Surfaces ride state, rider context, pricing, pickup/drop-off details, and flight information in one place so airport pickups and scheduled appointments are prepared before the driver reaches the curb.
- **Low-touch accessibility**: Prioritizes a calm, legible daily agenda with large cards, clear status labels, concise copy, and reusable mobile UI patterns so older professional drivers can understand the day quickly between rides.
- **Relationship memory**: Establishes the core rider, ride, pricing, flight, and dashboard summary data needed to remember client history, preferences, lifetime value, and ride-specific context on the home screen.
- **FSD placement (implementation hint)**: Home route files in `src/app/` should compose lower-level slices only; the home screen belongs in a page slice, reusable schedule/stat card UI can live in shared or widget-level UI if reused, and ride/rider/pricing/flight data should be modeled as entities with imports flowing downward.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Today's Business Snapshot (Priority: P1)

As a HUM driver starting or checking the day, I want the home page to show today's earnings, this week's earnings, and ride-goal progress above my schedule so I immediately understand how my private driving business is doing.

**Why this priority**: The home page is the driver's default command center; the stat card anchors the screen in business ownership and progress before any detailed ride action.

**Independent Test**: Can be tested by opening the home page with dashboard summary data and verifying that the three stat card values are visible, labeled plainly, and match the provided data.

**Acceptance Scenarios**:

1. **Given** a signed-in driver with dashboard summary data, **When** they open the home page, **Then** they see today's earnings, this week's earnings, and ride-goal progress in a prominent stat card.
2. **Given** ride-goal progress is available as completed rides and a target, **When** the stat card is displayed, **Then** the driver sees progress in a format such as "7/10 rides this week" rather than a vague status.
3. **Given** the driver has no earnings or rides for the selected day, **When** they open the home page, **Then** the stat card still displays clear zero-state values without hiding the section.

---

### User Story 2 - Review Today's Ride Schedule (Priority: P1)

As a HUM driver, I want a list of today's rides with rider, route, timing, pricing, and status so I know what needs my attention next.

**Why this priority**: The schedule is the core daily workflow and must work even before richer flight or message actions exist.

**Independent Test**: Can be tested by loading rides in each supported state and verifying that the schedule lists them in day order with the correct rider, pickup/drop-off, price, and status-specific display.

**Acceptance Scenarios**:

1. **Given** the driver has multiple rides today, **When** they view the home page, **Then** rides are ordered by their scheduled pickup or relevant active time.
2. **Given** a ride is pending, confirmed, driving to appointment, driving to destination, or completed, **When** its card is displayed, **Then** the card shows a distinct plain-language state and the information most useful for that state.
3. **Given** a ride includes a rider and pricing details, **When** the card is displayed, **Then** the rider's name and quote/pricing information are visible without opening a detail screen.
4. **Given** a ride is completed, **When** the schedule is displayed, **Then** the completed state is clear and visually less urgent than upcoming or active rides.

---

### User Story 3 - Prepare for Airport Pickups (Priority: P2)

As a HUM driver handling an airport pickup, I want flight details on the ride card so I can anticipate delays, arrivals, gates, and terminals without switching to another app.

**Why this priority**: Airport pickups are HUM's signature concierge moment; flight context is the difference between a generic ride card and the Kevin-level prepared experience.

**Independent Test**: Can be tested by loading an airport ride with flight data and verifying that the card displays airline/flight number, airport, arrival time, delay status, gate, and terminal when available.

**Acceptance Scenarios**:

1. **Given** a ride has an associated flight, **When** the ride card is displayed, **Then** flight number, airport, arrival time, delay status, gate, and terminal are shown where available.
2. **Given** a flight is delayed, **When** the ride card is displayed, **Then** the delay is visible in a way that helps the driver adjust their day.
3. **Given** a ride has no flight information, **When** the ride card is displayed, **Then** the card focuses on fixed pickup time, pickup address, drop-off address, rider, and pricing without showing empty flight fields.

---

### User Story 4 - Establish Home Data Foundations (Priority: P2)

As the product team, I want the backend data shape for riders, rides, pricing, flight data, and dashboard stats to be defined so the home page can display real driver-specific information when data creation is added later.

**Why this priority**: The front-end screen depends on a coherent data model; the app can use seeded or manually inserted data now while full creation flows come later.

**Independent Test**: Can be tested by providing representative records for each entity and confirming the home page can render the stat card, regular ride cards, and airport ride cards without requiring data-entry flows.

**Acceptance Scenarios**:

1. **Given** representative rider, ride, pricing, flight, and dashboard summary records exist for a driver, **When** the home page loads, **Then** all visible sections are populated from those records.
2. **Given** data creation is out of scope, **When** the feature is tested, **Then** the tester can still verify display behavior using pre-existing or seeded records.
3. **Given** a signed-in driver views the home page, **When** data is loaded, **Then** only that driver's schedule and dashboard summary are shown.

---

### Edge Cases

- A driver has no rides today; the home page should show the stat card and a calm empty schedule state with no misleading appointments.
- A ride is missing optional pickup information; the card should still show the rider, drop-off, pricing, and state while making the missing field obvious enough to correct later.
- A flight-associated ride is missing some flight fields; available fields should display while missing gate, terminal, or delay details do not create blank labels.
- Flight data is stale or unavailable; the card should communicate that the latest flight details are not confirmed rather than implying the flight is on time.
- Two rides overlap or are very close together; the schedule should preserve chronological order and make the timing visible enough for a driver to notice the conflict.
- Pricing has a quote but no accepted amount yet; the pending price should display differently from a confirmed accepted price.
- A rider has no preferences; the rider data remains valid and no empty preference copy appears on the home page.
- The driver is offline or data cannot load; the home page should show a recoverable loading/error state and not display another driver's data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a driver home page containing a business stat card and today's ride schedule.
- **FR-002**: System MUST display today's earnings, this week's earnings, and weekly ride-goal progress in the stat card.
- **FR-003**: System MUST support ride-goal progress as a completed ride count and target ride count for the current week.
- **FR-004**: System MUST display today's rides in chronological order based on the ride's relevant scheduled or active time.
- **FR-005**: System MUST support the ride states pending, confirmed, driving to appointment, driving to destination, and completed.
- **FR-006**: System MUST vary ride-card content and emphasis based on ride state so the driver sees the most relevant next information.
- **FR-007**: System MUST display each ride's associated rider, drop-off address, and quote/pricing information.
- **FR-008**: System MUST support rides with fixed pickup time and pickup address when no flight is associated.
- **FR-009**: System MUST support rides with associated flight details, including flight number, airport, arrival time, delay status, gate, and terminal when known.
- **FR-010**: System MUST avoid showing empty or placeholder flight fields for rides that do not have flight details.
- **FR-011**: System MUST define persistent rider records including first name, last name, total rides, lifetime value, preferences, and phone number.
- **FR-012**: System MUST define persistent pricing records including quoted amount, accepted amount, and platform average comparison values.
- **FR-013**: System MUST define persistent ride records that connect a driver, rider, pricing information, state, pickup details, drop-off details, and optional flight information.
- **FR-014**: System MUST define persistent flight records that can be associated with airport rides and can represent delayed, on-time, or unavailable status.
- **FR-015**: System MUST define persistent driver dashboard summary data or derivable summary values for the stat card.
- **FR-016**: System MUST scope displayed dashboard and ride data to the signed-in driver.
- **FR-017**: System MUST allow the home page to render from pre-existing records without requiring ride, rider, flight, pricing, or stat-card creation flows in this feature.
- **FR-018**: System MUST use existing reusable mobile UI primitives and shared app styling wherever they satisfy the design need, creating custom home components only when the reusable set does not cover a required pattern.
- **FR-019**: System MUST provide loading, empty, and recoverable error states for the home page.
- **FR-020**: System MUST present all money, time, status, and route information in plain language suitable for quick use between rides.

### Key Entities *(include if feature involves data)*

- **Driver Dashboard Summary**: A driver-specific snapshot for the home stat card; includes today's earnings, this week's earnings, completed rides this week, target rides this week, and freshness of the summary.
- **Ride**: A scheduled or active driving engagement; includes driver ownership, rider association, current state, ride type, pickup time, pickup location when applicable, drop-off location, pricing association, optional flight association, and ordering information for the daily schedule.
- **Ride State**: The current operational phase of a ride: pending, confirmed, driving to appointment, driving to destination, or completed. The state determines the card's label, urgency, and supporting details.
- **Rider**: A client or passenger associated with a ride; includes first name, last name, total rides, lifetime value, preferences, and phone number.
- **Pricing**: The financial context for a ride; includes quoted amount, accepted amount when available, and platform average comparison values to help the driver understand the quote.
- **Flight**: Flight context for an airport ride; includes flight number, airport, arrival time, delay status, gate, terminal, and data freshness/availability.
- **Location**: A pickup or drop-off place shown to the driver; includes a display address or place name and enough route context for the schedule card.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% of test drivers can identify their next scheduled or active ride within 5 seconds of opening the home page.
- **SC-002**: 90% of test drivers can state today's earnings, this week's earnings, and weekly ride-goal progress within 10 seconds of opening the home page.
- **SC-003**: For representative test data, 100% of supported ride states display a distinct status and state-appropriate information on the home schedule.
- **SC-004**: For representative airport rides, 95% of available flight fields are visible on the ride card without requiring the driver to open another app.
- **SC-005**: The home page can render with no rides, regular rides, airport rides, active rides, completed rides, and missing optional flight fields without blocking the driver.
- **SC-006**: 85% of usability test participants rate the home page as clear and calm for between-ride use.

## Assumptions

- The driver must already be authenticated before the home page is shown.
- Data creation, editing, importing, and flight lookup automation are out of scope for this feature; representative records will be created by another workflow or seeded manually for testing.
- The prototype agenda screen is a visual and content reference, not a strict requirement to copy every label, color, or action.
- The first version focuses on the current day schedule rather than multi-day calendar navigation.
- Pricing is shown as driver-facing business context; payment collection and settlement are out of scope.
- Rider preferences may be a short list of plain-language notes and may be empty.
- Flight gate and terminal may be unavailable until close to arrival; the display should reflect uncertainty when data is incomplete.
- Stat card values may be stored directly or derived from ride data during implementation, as long as the driver sees consistent values on the home page.
