# Game Design Document: Virtual Pet Companion

## 1. Game Overview
**Title:** Virtual Pet Companion (Working Title)
**Platform:** Web Browser (Desktop & Mobile)
**Genre:** Simulation / Virtual Pet
**Target Audience:** Casual gamers, retro enthusiasts

### 1.1 Premise
The user adopts a digital pet that starts as an egg. Through daily care—feeding, cleaning, and playing—the pet grows and evolves. The goal is to raise a healthy, happy pet through various life stages.

### 1.2 Core Philosophy
-   **Accessible:** Easy to pick up, short sessions.
-   **Responsive:** The pet reacts to user actions and neglect.
-   **Progression:** Visual growth and evolution provide long-term motivation.
-   **Extensible:** Built with future backend integration in mind.

---

## 2. Gameplay Mechanics

### 2.1 The Loop
1.  **Check Status:** User sees pet's current state (Hungry? Dirty? Bored?).
2.  **Action:** User performs an action (Feed, Clean, Play).
3.  **Reaction:** Pet plays an animation, stats improve.
4.  **Consequence:** Over time, stats decay. Neglect leads to illness or poor evolution paths.

### 2.2 Pet Stats
Each stat ranges from 0 to 100.
-   **Hunger:** Increases over time. 100 = Full, 0 = Starving.
    -   *Action:* Feed (Restores Hunger).
-   **Hygiene:** Decreases over time. 100 = Clean, 0 = Filthy.
    -   *Action:* Clean (Restores Hygiene).
-   **Happiness:** Decreases over time. 100 = Happy, 0 = Depressed.
    -   *Action:* Play (Restores Happiness, slightly decreases Energy/Hunger).
-   **Energy:** Decreases with Play/Time, increases with Sleep. (Optional for V1, can be simplified to just "Health" or implied).
    -   *Proposal:* Let's stick to **Hunger, Hygiene, Happiness, and Energy** as the core 4.

### 2.3 Life Stages
The pet evolves based on **Time Alive** + **Care Quality**.
1.  **Egg:** 5-10 seconds (hatching animation).
2.  **Baby:** Needs frequent care.
3.  **Child:** First evolution. Appearance depends on care history.
4.  **Teen:** More resilient, stats decay slower.
5.  **Adult:** Final form.
6.  **Senior/Death:** End of lifecycle. Upon death, the pet moves to the **Memorial**.

### 2.5 Milestone Cards & Memorial
-   **Milestone Cards:** Generated upon every evolution and death.
    -   *Style:* Greeting card aesthetic.
    -   *Content:* Snapshot of the pet at that stage, aggregate stats (e.g., "Ate 50 burgers"), and mini-thumbnails of previous stages.
-   **The Memorial:** A gallery view of all past deceased pets.
    -   Selecting a pet reveals their simplified timeline of Milestone Cards.

---

## 3. Architecture & Domain Design

### 3.1 Domain Driven Design (DDD) Strategy
The application will be architected with a strict separation between the **Core Domain** (Pure Logic) and the **Infrastructure/UI** (React/LocalStorage).

### 3.2 Core Domain Entities

#### **Entity: Pet**
The heart of the application. It encapsulates all state and behaviors related to the pet.
-   **Identity:** Unique ID (`uuid`).
-   **State (Properties):**
    -   `Name` (String)
    -   `BirthDate` (Timestamp)
    -   `Stats` (Value Object: Hunger, Hygiene, Happiness, Energy)
    -   `LifeStage` (Enum: EGG, BABY, CHILD, TEEN, ADULT)
    -   `Status` (Derived: Healthy, Sick, Sleeping)
-   **Behaviors (Methods):**
    -   `feed()`: Restores hunger, triggers reaction.
    -   `clean()`: Restores hygiene.
    -   `play()`: Increases happiness, decreases energy.
    -   `update(deltaTime)`: Calculates stat decay, checks for evolution, updates age.
    -   `evolve()`: Handles logic for stage transition based on history. Generates a `Milestone`.
    -   `rename(newName)`: Updates the name of the Pet (User Feature).

#### **Value Objects**
-   **Stats:** Immutable object holding the 4 core metrics. Encapsulates validation logic (clamping values 0-100).
-   **CareHistory:** Tracks aggregate interactions (e.g., "timesFed", "mistakesMade") which influence evolution paths.
-   **Milestone:** A snapshot record created at stage transitions.
    -   `stage`: The stage reached.
    -   `timestamp`: When it happened.
    -   `statsSnapshot`: User interactions up to this point.
    -   `image`: Reference to the pet's look at this time.

### 3.3 Application Services
-   **PetService:** Orchestrates interactions between the UI and the Domain. Handles saving/loading via repositories.
-   **GameLoop:** Drives the `Pet.update()` method based on real-time ticking.

### 3.4 Infrastructure
-   **PetRepository:** Interface for persistence.
    -   *Implementation:* `LocalStoragePetRepository` (for now).
    -   *Future:* `CloudPetRepository`.
-   **View Layer:** React Components. These should contain **NO** game logic, only rendering logic based on the `Pet` entity state.
    ```json
    {
      "petId": "uuid",
      "name": "Fido",
      "birthDate": "timestamp",
      "lastInteraction": "timestamp",
      "stage": "BABY",
      "stats": {
        "hunger": 80,
        "hygiene": 100,
        "happiness": 50,
        "energy": 90
      },
      "history": {
        "mistakes": 0,
        "gamesPlayed": 5
      }
    }
    ```
-   **Extensibility:** The Repository pattern will allow swapping `localStorage` for a backend database without touching the Domain logic.

---

## 4. UI/UX Design

### 4.1 Layout
-   **Center Stage:** The Pet (Animated Sprite/SVG).
-   **Top Bar:** Stats indicators (Bars or Icons with circular progress).
-   **Bottom Bar:** Interaction Buttons (Feed, Clean, Play, Lights/Sleep).
-   **Drawer/Menu:** Access to **Memorial** and Settings.
-   **Overlays:** Feature generic "Milestone Card" modal on evolution events.

### 4.2 Aesthetics
-   **Theme:** Modern, clean, slightly "glassmorphic" (translucent card backgrounds).
-   **Colors:** Soft pastels or vibrant customized palettes. Dark mode support.
-   **Animations:** CSS interactions for buttons, keyframe animations for the pet (idle, eating, sleeping).
-   **Card Design:** "Scrapbook" style for Milestone Cards to differentiate from the main high-tech UI.

---

## 5. Future Roadmap
-   **Backend:** Node.js/Postgres for cloud saving.
-   **Multiplayer:** Visiting other users' pets.
-   **Minigames:** Actual playable mini-games instead of just a "Play" button.
-   **Inventory System:** Collectible items/foods.
