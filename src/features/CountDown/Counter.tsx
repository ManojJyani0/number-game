'use client'
import { useSelector, useDispatch } from 'react-redux'
import Countdown from 'react-countdown'
import { fetchCurrentGame, selectCurrentGame } from '../JoinGame/Slice';
import { fetchContestAsync } from '../JoinGame/Slice';
import { AppDispatch } from '@/store';

const Completionist = () => <span>You are good to go!</span>;
const renderer = ({minutes, seconds, completed }:any) => {
  if (completed) {
    return <Completionist />;
  } else {
    return <span>{"0"+minutes}:{seconds<10?"0"+seconds:seconds}</span>;
  }
};
export function CountDonw() {
  // const [count, setCount] = useState<number>(1)
  const liveGame = useSelector(selectCurrentGame)
  const dispatch = useDispatch<AppDispatch>()
  
  return (
    <div>
       <div className="flex flex-col mx-4 max-w-sm">
        <div className="flex justify-between items-center my-3 mx-2">
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Contest</h2>
            <h2>{liveGame?.contestId}</h2>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">Count Down</h2>
            <Countdown
              date={liveGame?.gameEndTime}
              intervalDelay={0}
              precision={2}
              autoStart={true}
              renderer={renderer}
              onComplete={()=>{
                dispatch(fetchCurrentGame())
                dispatch(fetchContestAsync())
                // setCount(1)
              }}
            />
            
          </div>
        </div>

    </div>
    </div>
  )
}