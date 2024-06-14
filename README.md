# Community School Attendance App:

The app will assist in managing community school attendance. Admin can create terms (like '2024 Summer'), classes, and schedule classes within each term. The teacher will take the attendance of the class that they are assigned. It will display attendance rates for the term, and weekday for each class or the entire organization. This app is solely focused on taking attendance. The admin will create students, classes, terms, and teachers. However, over time, it will evolve into a student management app for private organizations.

## Installation

### Backend

1. Clone this repository:

```bash
git clone https://github.com/hatchways-community/capstone-project-two-abc0b72fc1084d49b41bb107ecf040ba.git
```

2.  Change Directory to backend folder

    ```bash
    cd backend
    ```

3.  Seed Data

    ```bash
    psql < comAtt.sql
    ```

4.  Install dependencies:

    ```bash
    npm install
    ```

5.  Start the backend server:

    ```bash
    npm run start
    ```

### Front End

1. Change Directory from Backend to Frontend folder:

   ```bash
   cd ..
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the front-end react app:

   ```bash
   npm run dev
   ```

### Admin Flow

1. The app comes with a default admin user. The username is "admin" and the password is "12345"

    ![alt text](/screenshoots/image.png)

2.Users see the dashboard after login

   ![alt text](/screenshoots/image-1.png)

3. Creating Teacher

    ![alt text](/screenshoots/image-2.png)

Admin is able to created users

   ![alt text](/screenshoots/image-3.png)

3. Creating Groups

    ![alt text](/screenshoots/image-5.png)

4. Create Student

    ![alt text](/screenshoots/image-6.png)

5. Create Terms

    ![alt text](/screenshoots/image-7.png)

6. Create Subjects

    ![alt text](/screenshoots/image-8.png)

6. Periods

This is the critical part of the attendance project. The admin should schedule at least one Sunday school for the entire day within the term. The app currently supports only 4 periods during the day. The admin needs to choose classes for each period that has only one subject, provided there is one teacher assigned to it.
For example, if there is one reading teacher, they cannot be assigned to teach a reading class to both K-2 and 3-5 grades simultaneously. If there are 4 groups, 4 classes, and 4 periods, the admin needs to repeat this process 16 times. After one day schedule done admin can copy this schedule to anatheer sunday day.nce the schedule for one day is complete, the admin can copy this schedule to another Sunday.

   ![alt text](/screenshoots/image-9.png)
   ![alt text](/screenshoots/image-10.png)

Final Schedule

   ![alt text](/screenshoots/image-11.png)

Copy this schedule to another Sunday School

   ![alt text](/screenshoots/image-12.png)
   ![alt text](/screenshoots/image-13.png)

7. Dashboard Missing Submitted and Pending Attendances
   Admins can see missing submitted attendances and pending attendances on their dashboard. As soon as they click the dashboard card, Admins can see the details of the attendance. Admins can also take attendance or update the attendance.

Dashboard
    ![alt text](/screenshoots/image-21.png)

Submitted Attendances
    ![alt text](/screenshoots/image-22.png)

Pending Attendances
    ![alt text](/screenshoots/image-23.png)

update taken attendances
    ![alt text](/screenshoots/image-24.png)

submit missing attendances
    ![alt text](/screenshoots/image-25.png)

8. Report

Admin can get report of sudents attendance for each term
    ![alt text](/screenshoots/image-26.png)

### Teacher Flow

1. Login, Teacher can login with username and password that created by Admin
    ![alt text](/screenshoots/image-14.png)

2. Teacher can see their dashboar that shows submitted and pendingn attendance for current sunday school
    ![alt text](/screenshoots/image-15.png)

3. Teacher able to see schedule for each period
   ![alt text](/screenshoots/image-16.png)

4. User see the students names and take attendance after selecting the period
    ![alt text](/screenshoots/image-17.png)

5. After Attendances submited teacher can see whicch attendacen is taken and also can update the attendance after submission and dasboard metric changes accordingly
    ![alt text](/screenshoots/image-18.png)
    ![alt text](/screenshoots/image-19.png)
    ![alt text](/screenshoots/image-20.png)
