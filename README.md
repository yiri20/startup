[my note](notes.md)

# Music Review Planner

This application allows users to plan their music listening schedule and record reviews for the albums or tracks they listen to. The platform provides a simple way to organize music discovery, track listening habits, and document thoughts or ratings, making it ideal for music enthusiasts and casual listeners alike.

## Specification Deliverable

### Elevator Pitch
Are you someone who enjoys discovering new music but finds it hard to keep track of what you’ve listened to or plan to listen to? The Music Review Planner lets you schedule your music listening plans, organize albums and tracks, and write reviews all in one place. With simple scheduling features and personalized reviews, you’ll never miss a track or forget what you thought of an album again!

### Design
![My Image](Design%201.jpg)
![My Image2](Design%202.jpg)

**Main features sketch:**
1. **Music Scheduler** - Calendar view for planning when to listen to albums or tracks.
2. **Review System** - Users can leave ratings and reviews for the music they listen to, which will be displayed publicly.
3. **Explore Section** - Suggests trending albums or tracks for users to listen to and plan.
4. **User Authentication** - Register and log in to create music plans and write reviews.

### Key Features
- Secure login and user authentication
- Ability to add, update, or remove planned music listening sessions
- Rating and review system for albums/tracks
- Explore section suggesting new music

- Social sharing of reviews

### Technologies
I will use the required technologies in the following ways:

- **HTML**: Two primary HTML pages: one for the user dashboard (with the music planner) and one for reviewing music. Will use hyperlinks to the review forms and exploration section.
- **CSS**: The site will be styled to ensure it looks good on various screen sizes, using grid systems and responsive design.
- **JavaScript**: Will manage interaction for adding and updating music plans, submitting reviews, and retrieving trending music.
- **React**: The application will be developed using React for managing components like the calendar, review form, and explore section.
- **Service**: Backend service will provide endpoints for:
  - Fetching planned music sessions
  - Submitting reviews
  - Retrieving album data and suggestions via a third-party API such as Spotify’s Web API.
- **Authentication**: Users will be able to sign up and log in. Their credentials will be securely stored, and reviews and plans will be tied to their account.
- **Database**: User data, including music plans and reviews, will be stored in a database.
- **WebSocket**: Real-time updates will show user activity, like when someone posts a new review.
