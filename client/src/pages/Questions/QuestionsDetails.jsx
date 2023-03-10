import React, { useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upVote from "../../assets/sort-up.svg";
import downVote from "../../assets/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/question";

const QuestionsDetails = () => {
  const { id } = useParams();

  const User = useSelector((state) => (state.currentUserReducer));
  const location = useLocation()
  // console.log(location)
  const url = 'http://localhost:3000'
  const questionsList = useSelector((state) => state.questionsReducer);

  const [Answer, setAnswer] = useState("");
  const [answerBody] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePostAns = (answerLength) => {
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        // console.log("it has a body", answerBody);
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id
          })
        );
      }
    }
  };

  const handleShare = () =>{
    copy(url+location.pathname)
    alert('Copied url : '+url+location.pathname)
  }

  const handleDelete = () =>{
    dispatch(deleteQuestion(id, navigate))
  }

  const handleUpVote = () =>{
    dispatch(voteQuestion(id, 'upVote', User.result._id))
  }
  
  const handleDownVote = () =>{
    dispatch(voteQuestion(id, 'downVote', User.result._id))
  }

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upVote}
                        alt="upvotes"
                        width="18"
                        className="votes-icon" onClick={handleUpVote}
                      />
                      <p>{question.upVotes - question.upVotes || 0}</p>
                      <img
                        src={downVote}
                        alt="downVotes"
                        width="18"
                        className="votes-icon" onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>

                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>Share</button>
                          {
                            User?.result?._id === question?.userId && (
                              <button type="button" onClick={handleDelete}>Delete</button>
                            )
                          }
                        
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link to={`/User/${question.useId}`} className="user-link" style={{ color: "#0086d8" }}>
                            <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {question.Answer.length !== 0 && (
                  <section>
                    <h3>{question.Answer.length} Answers</h3>
                    <DisplayAnswer question={question} handleShare={handleShare}/>
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handlePostAns(question.answer?.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <input
                      type="submit"
                      className="post-ans-btn"
                      value="Post Your Answer"
                    />
                  </form>

                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag) => (
                      <Link to="/Tags" key={tag} className="ans-tags">
                        {" "}
                        {tag}{" "}
                      </Link>
                    ))}{" "}
                    or
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      {" "}
                      ask you own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;

