# Capstone 2 Project Proposal
## Erkan Turker

### Community School Attendance App

#### What goal will your project be designed to achieve?
- **Provide managing community school attendance:** The app will assist in managing community school attendance . 
- **Help Planning their class:** create terms (like '2024 Summer'), classes, and schedule classes within each term.
- **Shows Attendence Rate:**  It will display attendance rates for the term, month, and weekday for each class or the entire organization

#### What kind of users will visit your app? In other words, what is the demographic of your users?
- The target demographic for the app consists of small community schools, such as Sunday schools, where classes are typically held once a week or twice a month.

#### Will this be a website? A mobile app? Something else?
- Yes, It will be a website and support phone/tablet view.

#### What data do you plan on using?
- The application will exclusively utilize its own data; there's no need for third-party APIs. The admin will create students, teachers, and classes. Teachers will generate attendance records for each class they are assigned to.

#### What tech stack will you use for your final project?
- **Frontend:** React, CSS, Ant Design of React.
- **Backend:** Node, Express
- **Database:** PostgreSQL.

### Project Breakdown

2. **Create Model and Schema for User Wishlist:**
   - Define a models to store student,teacher,terms,classroom infromataion, attendence,
  
   - ![image](https://github.com/hatchways-community/capstone-project-two-abc0b72fc1084d49b41bb107ecf040ba/assets/63922809/d4a05e14-65f3-475e-b87e-95f1416924f4)

  

2. **Setting Up Backend:**
   - Install Node and Express for the backend.
   - Install any other necessary libraries or tools.
   - Creates routes for creating term,teacher,student,classroom and attendence


3. **Login and Authentication Logic:**
   - Only admin can create user to login
   - Admin can do all the action create user, classroom.. The user with teacher role ony can access take attendce

5. **Set Up Frontend Environment:**
   - Use React render dynamic content from the backend.
   - CSS, and Ant Design for the frontend layout.
   - Create admin dashboard to make all the action available,
   - Crete Teacher Dashboard to take attendce

6. **Implement Wishlist Functionality:**
   - Allow users to add and remove games from their wishlist.
   - Display the wishlist on the frontend with prices from different stores.
   - Implement notifications for price drops or new releases.

7. **Testing and Debugging:**
   - Test the application thoroughly to ensure all features work as expected.
   - Use tools like jest for backend testing and vitest for frontend testing.
   - Debug any issues that arise during testing.

8. **Deployment:**
   - Deploy the application to a hosting service like Heroku or AWS.
   - Ensure the application is secure and scalable for potential future updates.

### Stretch Goals
-  Over time, it will evolve into a student management app for private organizations.
-  Teachers can share their classroom materials
-  Students can have their own dashboard to access their subject materials.
-  Parents can register their students, make payments for the term, and check their grammar.
