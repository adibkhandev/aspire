import bigPlus from './../../assets/images/big-plus.svg'
const SecondStep = ({setStep}) => {
    return (
      <div className="upload-parts" id='video'>
        <div className="videos">
          <div className="video-clicker">
            <div className="video-clicker-contents">
              <img src={bigPlus} alt="" className="plus" />
              <div className="desc">
                 Click to <span>select</span> video
              </div>
            </div>
          </div>
          <div className="entitle-cont">
              <input placeholder="Title for your video ..." id="entitle" type="text" name='title'       className='regular-inputs' />
          </div>
          <div className="textarea-container" id="custom-textarea">
              <textarea  name='courseDescription' placeholder="Write about your course ...."  id="" className=""rows="9"></textarea>
          </div>
          <input className="hidden" type="file" name="video" id="" />
          <div className="handy-btns">
              <div onClick={()=>setStep(1)} className="secondary-btn">Discard</div>
              <div className="cta-btn">Continue</div>
          </div>
        </div>
      </div>
    )
}
export default SecondStep