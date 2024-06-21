import React from 'react'
import './LogoutPopupStyle.css';
import Button from '../../Button/Button';

const LogoutPopup = ({showActive, message, onCancel, onAllow, userId, isPopupFetching}) => {
  return (
    <div className={`popupWrapper logoutPop ${showActive && 'active'}`}>
        <div className="popupContainer LogoutPopup">
            <div className="popupHeader">
                <span className="close"><img src="/assets/svg/close.svg" alt=""  /></span>
            </div>
            <div className="popupBody flexbox">
                <div className="popBodyWrap flexbox"><img src="/assets/svg/alert.svg" alt="" /></div>
                <p className="logOutText flexbox">{message}</p>
                <div className="buttonWrapper">
                    <Button className={'RedFillButton'} name={'Yes, I’m Sure'} isWaiting={isPopupFetching} disabled={isPopupFetching} onClick={() => {
                        if(userId) {
                            onAllow(userId)
                        } else {
                            onAllow(true)
                        }
                        }}/>
                    <Button className={'GreyFillButton'} name={'No, Cancel'} onClick={() => onCancel(false)}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LogoutPopup