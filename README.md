# MCQ Quiz Application

## Project Overview
The MCQ Quiz Application allows admins to create and manage multiple-choice tests and invite participants for quiz. Participants can take the quiz within a specified time frame, answer questions, and view their scores after submission. The application ensures security by restricting access to invited users only.

## Technologies Used
- **Backend:** Spring Boot
- **Frontend:** React.js
- **Database:** MySQL

## Requirements Being Solved

### Admin Features
- Admin login and create quiz.
- Ability to upload questions with four options and one correct answer.
- Create tests with a fixed number of questions.
- Set start and end times for each test.
- Invite participants via generated link.
- Restrict access so only invited users can take the test.

### Test Taker Features
- Login only if invited.
- Answer test questions one by one and update answers before submission.
- Submit test and view scores; answers cannot be updated after submission.
- Prevent answer submission after the test duration expires.
- Auto-submit tests when time expires and calculate scores.
- Scoring system: **+1** for correct answers, **0** for incorrect answers.

## Database Schema
The application consists of the following tables:

### Entities:
- **User**  
  `(user_id, name, email)`

- **Quiz**  
  `(quiz_id, quiz_name, start_time, end_time, num_questions, List<Question>)`

- **Question**  
  `(question_id, question_description, option1, option2, option3, option4, correct_answer)`

- **Invitation**  
  `(invitation_id, invited_emails, token, quiz)`

- **Response**  
  `(response_id, question, user_option, user)`

- **Result**  
  `(result_id, user, quiz, score)`


## API Documentation

### LoginController
- **Admin Login:**  
  `POST /login`
### UserLoginController
- **User Login (Validation):**  
  `POST /quizzes/user-login?token={token}`

### Quiz Controller
- **Create Quiz:**  
  `POST /quizzes/createQuiz`
- **Get all quizzes:**  
  `POST /quizzes/allQuizzes`
- **Get Quiz by Id:**  
  `POST /quizzes/{quizId}`

### QuestionController
- **Get all questions:**  
  `POST /question/allQuestions`
- **Add new question:**  
  `POST /question/addNewQuestion`
  
### Invitation Controller
- **Generate Invitaion Link:**  
  `POST /inviatation/generate`
- **Validate the link:**  
  `POST /invitation/validate`
  
### Response Controller
- **Submit a question response:**  
  `POST /response/submit-answer

### Result Controller
- **Submit quiz:**  
  `POST /results/submit-test`
- **Get Score:**  
  `POST /results/get-score`




