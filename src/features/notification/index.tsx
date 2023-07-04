import { useEffect } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { selectNotification } from '../auth/authSlice'
const Notification = () => {
    const notification = useSelector(selectNotification)
useEffect(()=>{
    switch (notification.type) {
        case "success":
            toast.success(notification.message)
            break;
        case "error":toast.error(notification.message);
            break;
        default:
            break;
    }
},[notification.message,notification.type])
  return (
        <Toaster/>
  )
}
export default Notification