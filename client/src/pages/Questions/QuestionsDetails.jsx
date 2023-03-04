import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
// import copy from 'copy-to-clipboard'

import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import {  postAnswer } from '../../actions/question'

const QuestionsDetails = () => {

    const { id } = useParams()
    const questionsList = useSelector( state => state.questionsReducer) 
    console.log(questionsList)

    // console.log(_id)

    // var questionsList =[{
    //     _id: '1',
    //     upVotes:3,
    //     downVotes:2,
    //     noOfAnswers: 2,
    //     questionTitle: "what is a function?",
    //     questionBody: "It meant to be ",
    //     questionTags: ["java", "node js", "react js", "monongo"],
    //     userPosted: "mano",
    //     userId: 1,
    //     askedOn: "jan 1",
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'kumar',
    //       answeredOn: "jan 2",
    //       userId : 2,
    //     }]
    //   }, {
    //     _id: '2',
    //     upVotes:0,
    //     downVotes:2,
    //     noOfAnswers: 0,
    //     questionTitle: "what is a function?",
    //     questionBody: "It meant to be ",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'kumar',
    //       answeredOn: "jan 2",
    //       userId : 2,
    //     }]
    //   },{
    //     _id: '3',
    //     upVotes: 1,
    //     downVotes:2,
    //     noOfAnswers: 0,
    //     questionTitle: "what is a function?",
    //     questionBody: "It meant to be ",
    //     questionTags: ["javascript", "R", "python"],
    //     userPosted: "mano",
    //     askedOn: "jan 1",
    //     userId: 1,
    //     answer: [{
    //       answerBody: "Answer",
    //       userAnswered: 'kumar',
    //       answeredOn: "jan 2",
    //       userId : 2,
    //     }]
    //   }
    // ]

    const [Answer, setAnswer] = useState('')
    const [answerBody] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))

    const handlePostAns = (answerLength) => {
      console.log ("posting answer 2");
              if (User === null) {
                alert("Login or Signup to answer a question");
                navigate("/Auth");
              }
              else{
              if (Answer === "") {
                alert("Enter an answer before submitting");
              } 
              else{
                // console.log("it has a body", answerBody);
                dispatch(
                    postAnswer({id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name,})
                  );
               }
              }
            };
  return (
    <div className='question-details-page'>
     {
        questionsList.data === null ?
        <h1>Loading...</h1> :
        <>
            {
                questionsList.data.filter(question => question._id === id).map(question =>(
                    <div key={question._id}>
                      <section className='question-details-container'> 
                        <h1>{question.questionTitle}</h1>
                          <div className='question-details-container-2'>
                            <div className='question-votes'>
                              <img src={upVote} alt="upvotes" width='18' className='votes-icon'/>
                              {/* <p>{question.upVotes - question.downVotes}</p> */}
                              <p>{question.upVotes - question.upVotes || 0}</p> 
                              <img src={downVote} alt="downVotes" width='18' className='votes-icon'/>
                            </div>
                            <div style={{width:"100%"}}>
                              <p className='question-body'>{question.questionBody}</p>
                              <div className="question-details-tags">
                                {
                                  question.questionTags.map((tag) =>(
                                    <p key={tag}>{tag}</p>
                                  ))
                                }
                              </div>

                              <div className="question-actions-user">
                                <div>
                                  <button type='button' >Share</button>
                                  <button type='button'>Delete</button>
                                </div>
                                <div>
                                  <p>asked {moment(question.askedOn).fromNow()}</p>
                                  <Link to={`/User/${question.useId}`} className='user-link' style={{color:'#0086d8'}}>
                                    <Avatar backgroundColor="orange" px='8px' py='5px' borderRadius="4px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                      {question.userPosted}
                                    </div>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                      </section>
                      {
                        question.noOfAnswers !== 0 && (
                          <section>
                            <h3>{question.noOfAnswers} Answers</h3>
                            <DisplayAnswer key={question._id} question={question}/>
                          </section>
                        )
                      }
                      <section className='post-ans-container'>
                        <h3>Your Answer</h3>

                      {/* <form onSubmit={(e) => { 
                            e.preventDefault();
                            console.log("posting answer");
                            handlePostAns(question.answer?.length);
                          }
                        }>
                        <textarea name="" id="" cols="30" rows="10" value={Answer} onChange={ (e) => setAnswer(e.target.value) }></textarea>
                        <input type="submit" className="post-ans-btn" value="Post Your Answer"/>
                      </form> */}

                    <form onSubmit={(e) => { 
                        e.preventDefault();
                        console.log("posting answer");
                        handlePostAns(question.answer?.length);
                      }
                    }>
                    <textarea name="" id="" cols="30" rows="10" value={Answer} onChange={ (e) => setAnswer(e.target.value) }></textarea>
                    <input type="submit" className="post-ans-btn" value="Post Your Answer"/>
                  </form>           




                        <p>
                          Browse other Question tagged
                          {
                            question.questionTags.map((tag) =>(
                              <Link to='/Tags' key={tag} className='ans-tags'>   {tag}  </Link>
                            ))
                          } or
                          <Link to='/AskQuestion' style={{textDecoration: "none", color:"#009dff"}}>  ask you own question.</Link>
                        </p>
                      </section>
                    </div>
                ))
            }
        </>
     }
    </div>
  )
}

export default QuestionsDetails