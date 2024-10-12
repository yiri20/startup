<<<<<<< HEAD
# simon-html

This deliverable demonstrates the use of basic HTML elements for structure, basic formatting, input, output, links, and drawing.
=======
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
>>>>>>> origin/main
#### HTML Start Up
20% HTML pages for each component of your application
 - riview page for ability to add, update, or remove planned music listening sessions and rating and review system for albums/tracks
10% Proper use of HTML tags including BODY, NAV, MAIN, HEADER, FOOTER
10% Links between pages as necessary
 - Home -> about, review, schedule, sign up
 - review -> create, each review
 - schedule

10% Application textual content
 - In the main and about page
10% Placeholder for 3rd party service calls
 - spotify api and google calendar api will be used for the schedule and the explore

10% Application images
 -  In the explore page, I added a placeholder image.

10% Login placeholder, including user name display
 - If I click on the login button in the Home

10% Database data placeholder showing content stored in the database
 - Reviews and plans in review and schedule pages

10% WebSocket data placeholder showing where realtime communication will go
 - In the review page, I added a placeholder for live review section.

#### Start Up CSS
30% Header, footer, and main content body
  
20% Navigation elements
  
10% Responsive to window resizing
  
20% Application elements
  
10% Application text content
  
10% Application images
  
