import React, {useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './AskQuestion.css'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
  const [ questionTitle, setQuestionTitle ] = useState('')
  const [ questionBody, setQuestionBody ] = useState('')
  const [ questionTags, setQuestionTags ] = useState('')

  const dispatch = useDispatch()
  const User = useSelector((state) => (state.currentUserReducer))
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({questionTitle, questionBody, questionTags})
    dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id }, navigate))
  }

  const handleEnter = (e) =>{
    if(e.key === 'Enter'){
      setQuestionBody(questionBody + "\n")
    }
  }

  return (
    <div className="ask-question">
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor="ask-ques-title">
              <h4>Title</h4>
              <p>Be sepccific and imagine you're asking a questionto anther person</p>
              <input type="text" name='questionTitle' id='ask-ques-title' onChange={(e)=>{setQuestionTitle(e.target.value)}} placeholder='e.g. It there an R function' />
            </label>

            <label htmlFor="ask-ques-Body">
              <h4>Body</h4>
              <p>include all the information someone would need to answer your question</p>
              <textarea name="" id="ask-ques-title" onChange={(e)=>{setQuestionBody(e.target.value)}} cols="30" rows="10" onKeyDown={handleEnter}></textarea>
            </label>

            <label htmlFor="ask-ques-tags">
              <h4>Tags</h4>
              <p>Add up to 5 tags to   describe what your question is about</p>
              <input type="text" name='questionTitle' id='ask-ques-title' onChange={(e)=>{setQuestionTags(e.target.value.split(" "))}} placeholder='e.g. It there an R function' />
            </label>
          </div>
          <input type="submit" value="Reivew your question" className='review-btn' />
        </form>
      </div>
    </div>
  )
}

export default AskQuestion
