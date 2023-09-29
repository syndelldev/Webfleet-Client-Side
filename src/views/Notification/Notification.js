/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './Aleart.css'
import ArchivedImg from '../../assets/images/archived.svg'
import {
  getNotification,
  ArchiveNotification,
  PushNotificationUser,
  clearAllMsg,
  markAsReadMsg,
  deleteNotificationId
} from '../api/api'
import moment from 'moment'
import { format } from 'date-fns';
import { useDispatch } from 'react-redux'
import {add, remove} from 'src/store/NotificationSlice'


function Aleart(props) {
  const dispatch = useDispatch();
   const {mainUserName,mainRole,mainUserId} = props
  const [ activeDiv , setActiveDiv ] = useState('all')
  const [msgList, setMagList] = useState([])
  const [UnreadMag, setUnreadMag] = useState([])
  const [ReadMag, setReadMag] = useState([])
  const [ArchivedMsgLog, setArchivedMsgLog] = useState([])
  const [ NoMsg, setNoMsg ] = useState(false)
  const [Archived, setArchived] = useState(false)


  const LoadNotification = async () => {
    const result = await getNotification(mainUserId)
    setMagList(result.data)
    // console.log(result.data,"data")

    // result.data.forEach(notification => {
    //   dispatch(add(notification)); // Assuming notification object has an appropriate structure
    // });

    const filterNoMsg = result.data.filter((item)=> item.status === 0)
    // console.log(filterNoMsg,"filter")
    if(filterNoMsg.length === 0){
      setNoMsg(true)
      console.log("done")
    }
  }

  const ArchiveMsg = async (msgId) => {
    await ArchiveNotification(msgId)
    LoadNotification()
    dispatch(remove(msgId))
  }

  const push = async (e) => {
    const msg = `${e} deleted a two user`
    await PushNotificationUser(msg)
  }

  const clearAll = async () => {
    setActiveDiv('clear')
    await clearAllMsg(mainUserId)
    LoadNotification()
    // dispatch(remove(mainUserId))

  }

  const markAsRead = async () => {
    setActiveDiv('markRead')
    await markAsReadMsg(mainUserId)
     LoadNotification()
     dispatch(remove(mainUserId))

  }

  const AllActivity = async () => {
    setActiveDiv('all')
    setArchived(false)
  }

  const deleteNotification = async(msgId) => {
    await deleteNotificationId(msgId)
    LoadNotification()

    dispatch(remove(msgId))

  }

  const ArchivedMsg = (count) => {
    setActiveDiv('Archived')
    setArchived(true)
    // dispatch(add(ArchivedMsgLog))
  }

  useEffect(()=>{
    //  LoadNotification()
    console.log("test loop")
  },[markAsRead])

  
  useEffect(() => {
    const filteredAll = msgList.filter((item) => item.status === 0)
    console.log(filteredAll,"filteredAll")
    setUnreadMag(filteredAll)
    

    const filteredRead = msgList.filter((item) => item.status === 1)
    setReadMag(filteredRead)

    const filterArchived = msgList.filter((item) => item.status === 2)
    setArchivedMsgLog(filterArchived)
  }, [msgList])

  useEffect(() => {
    if(mainUserId){
    LoadNotification()
    }
  }, [])

 


  return (
    <div className="Aleart_main_div">
      <div className="aleart_header_div">
        <button
          className={activeDiv === 'all' ? "aleart_header_active_div_btn aleart_header_div_btn_margin" : "aleart_header_div_btn aleart_header_div_btn_margin"}
          onClick={() => {
            AllActivity()
          }}
        >
          All Activities
        </button>
        <button
        className={activeDiv === 'markRead' ? "aleart_header_active_div_btn" : "aleart_header_div_btn"}
          onClick={() => {
            markAsRead()
          }}
        >
          Mark as Read
        </button>
        <button
          className={activeDiv === 'Clear' ? "aleart_header_active_div_btn" : "aleart_header_div_btn"}
          onClick={() => {
            clearAll()
          }}
        >
          Clear All
        </button>

        <button
           className={activeDiv === 'Archived' ? "aleart_header_active_div_btn" : "aleart_header_div_btn"}
          onClick={() => {
            ArchivedMsg()
          }}
        >
          Archived
        </button>
      </div>
      {Archived === false ? (
        <div className='Notification_log_div'>
          <>
            {UnreadMag.length > 0 && (
              <>
                {UnreadMag.map((ele) => (
                  <div className="Aleart_msg_div unread_div">
                    <p className="Aleart_msg">{ele.message}</p>
                    <p className="Aleart_date">{format(new Date(ele.time), 'dd-MM-yyyy HH:mm')}</p>

                    <span className="aleart_icon">
                      <button
                  className='aleart_icon_archived_btn'

                        onClick={() => {
                          deleteNotification(ele.id)
                        }}
                      >
                        X
                      </button>
                    </span>
                    <span className="aleart_icon_archived">
                  <button
                  className='aleart_icon_archived_btn'
                    onClick={() => {
                      ArchiveMsg(ele.id)
                    }}
                  >
                    <img src={ArchivedImg}/>
                  </button>
                  
                </span>
                  </div>
                ))}
              </>
            )}
          </>
          <>
            {ReadMag.map((ele) => (
              <div className="Aleart_msg_div">
                <p className="Aleart_msg">{ele.message}</p>
                <p className="Aleart_date">{format(new Date(ele.time), 'dd-MM-yyyy HH:mm')}</p>

                <span className="aleart_icon">
                  <button
                  className='aleart_icon_archived_btn'

                    onClick={() => {
                      deleteNotification(ele.id)
                    }}
                  >
                    X
                  </button>
                  
                </span>
                <span className="aleart_icon_archived">
                  <button
                  className='aleart_icon_archived_btn'

                    onClick={() => {
                      ArchiveMsg(ele.id)
                    }}
                  >
                     <img src={ArchivedImg}/>
                  </button>
                  
                </span>
              </div>
            ))}
          </>
        </div>
      ) : (
        <>
          <div className='Notification_log_div'>
            {ArchivedMsgLog.map((ele) => (
              <div className="Aleart_msg_div">
                <p className="Aleart_msg">{ele.message}</p>
                <p className="Aleart_date">{format(new Date(ele.time), 'dd-MM-yyyy HH:mm')}</p>

                <span className="aleart_icon">
                  <button
                  className='aleart_icon_archived_btn'

                    onClick={() => {
                      deleteNotification(ele.id)
                    }}
                  >
                    X
                  </button>
                </span>
              </div>
            ))}
          </div>
        </>
      )}
{/* 
      <button
        onClick={() => {
          push(mainUserName)
        }}
      >
        push notification
      </button> */}
      { NoMsg === true &&
      <div className='Notification_log_no_msg'>
        No new notification . . . 
      </div>
}
    </div>
  )
}
export default Aleart
