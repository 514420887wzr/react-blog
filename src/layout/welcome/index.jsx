import React, { useState, useEffect } from 'react'
import './index1.scss'
import $ from 'jquery'
const WelcomeLayout = props => {
  function redirect() {
    props.history.push('/home')
  }
  useEffect(() => {
    $(document).ready(function () {
      // console.log(`执行`, $(document));
      let startdelay = 200;
      let coredelay = 300;
      let maindelay = 630;
      let Timeout1 = setTimeout(() => {
        $('#ringgroup').addClass('pass')
        $('#light').addClass('pass')
        $('#core').addClass('pass')
      }, startdelay)
      let Timeout2 = setTimeout(() => {
        $('#light').addClass('passed')
        $('#wave').addClass('pass')
      }, startdelay + coredelay)
      let Timeout3 = setTimeout(() => {
        $('#body').removeClass('out').addClass('in')
      }, startdelay + coredelay + maindelay)
    });
    return () => {
      clearTimeout(Timeout1);
      clearTimeout(Timeout2);
      clearTimeout(Timeout3);
    }
  }, []);
  return (
    <div id='body' className="out">
      <div id="light"></div>
      <div id="wave"></div>
      <div id="stage">
        <div id="hero" onClick={redirect}>
          <img src={require('../../assets/images/holle.png')} alt=''></img>
          <p className='flash'>
            点击进入
          </p>
        </div>
      </div>
      <div id="ringgroup">
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
        <div class="ring"></div>
      </div>
      <div id="core">
        <img src={require('../../assets/images/0211.png')} alt=''></img>
      </div>
    </div>
  )
}
export default WelcomeLayout
