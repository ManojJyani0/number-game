import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { useEffect } from 'react'
import { fetchContestAsync, selectContestList } from './tableSlice'

export function Table() {
  const Games = useSelector(selectContestList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchContestAsync())
  }, [])
  



  return (
    <section className="text-gray-600 body-font">
      <div className="container px-1 py-4 mx-2">
        <div className="w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap border-y-2">
            <thead>
              <tr className="border-b-2"  >
                <th className="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Contest
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Price
                </th>
                <th className="px-6 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Number
                </th>
              </tr>
            </thead>
            <tbody>
              {Games?.map((game, index) => {
                if (game.winningNumber) {
                  return (
                    <tr key={index} className="border-b-2" >
                      <td className="px-2 py-3">{game.contestId}</td>
                      <td className="px-2 py-3">{game.winningPrice}</td>
                      <td className="px-6 py-3">{game.winningNumber}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};