# Monster Tracker

Monster Tracker is a web app built as part of the **Learn With Jason Hackathon**. The prompt was simple yet thrilling: "Monsters have arrived — build an app to help out in this new world!"

Whether kaiju have emerged from the ocean, Pokémon have become real, or cryptids have finally been caught on camera, Monster Tracker is here to document your encounters. This app lets users log and track their monster sightings, enriching each entry with detailed data from the D&D 5E API.

## Project Description

### The Prompt

The task was to build an app that helps in this new monster-infested world. The type of monster and how the app provides assistance were up to the imagination of the developer. Whether it's an app for scientific exploration, a survival tool, or even a remote monster-hunting robot controller, the goal was to be creative and build something functional within the given time frame.

### What Was Built

Given the time constraints, the following features were completed:

- **Sighting Form:** A form that allows users to log new monster sightings, capturing details like the monster's name, location, and a description of the encounter.
- **List of Sightings:** A view that displays all the sightings logged by the user, allowing them to review their entries.
- **Monster Match:** Each sighting card displays a possible match for the monster based on data pulled from the D&D 5E API.

### Planned Features

There were plans to include additional features, such as:

- **Confirmation Feature:** A feature where users could confirm whether the monster in the sighting was the one they encountered.
- **Map Integration:** To visualize the location of sightings on a map.
- **Image Upload:** Allowing users to attach photos to their sightings.
- **Enhanced Search and Filter:** To help users easily find specific sightings.

## Technologies Used

This app was built using:

- **[Convex](https://www.convex.dev/):** For storing and managing sighting data.
- **[Clerk](https://clerk.dev/):** For user authentication and management.
- **[React](https://reactjs.org/):** For building the user interface.
- **[D&D 5E API](https://www.dnd5eapi.co/):** For fetching detailed monster data to enrich user entries.

## How to Run the Project

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/monster-tracker.git
cd monster-tracker
```

2. Install the dependencies

```bash
npm install
```

3. Set up environment variables:

- Create a .env.local file in the root directory.
- Add your Convex, Clerk, and any other API keys as needed.

4. Run the development server

```bash
npm run dev
```

5. Open the app:
   Open http://localhost:3000 to view it in the browser.

Contributions

This project was built within a limited timeframe as part of the Learn With Jason Hackathon. Contributions and improvements are welcome!

If you want to contribute:

    1.	Fork the project.
    2.	Create your feature branch (git checkout -b feature/YourFeature).
    3.	Commit your changes (git commit -m 'Add some feature').
    4.	Push to the branch (git push origin feature/YourFeature).
    5.	Open a pull request.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements

    •	Thanks to Jason Lengstorf for organizing this hackathon and providing an inspiring prompt.
    •	Special shoutout to the developers behind Convex, Clerk, and the D&D 5E API for the awesome tools and resources.

Happy monster tracking!
