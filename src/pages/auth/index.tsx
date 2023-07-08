import { CountDonw } from '@/features/CountDown/Counter';
import { JoinGame } from '@/features/JoinGame/JoinGame';
import Modal from '@/features/Modal/Modal'
import { Auth } from '@/features/auth/Auth'
import BalanceCard from '@/features/blanceCard/BalanceCard';
import { Table } from '@/features/gameTable/Table';
import Head from 'next/head';
import React, { useState } from 'react'
type OpenModalProps = {
  open:boolean,
  setOpen :React.Dispatch<boolean>,
  value:number,
}
type Props = {}
const numberOt9Array:number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const Home = (props: Props) => {
  const [open ,setOpen] = useState<boolean>(false)
  const [number,setNumber] = useState<number>()
   return (
   <Auth>
    <Head>
        <title>Let's Play </title>
      </Head>
    <BalanceCard/>
    <CountDonw />
    <Modal open={open} setOpen={setOpen} number={number}>
      <JoinGame setOpen={setOpen} number={number}></JoinGame>
    </Modal>
    <ul className="w-full flex flex-row flex-wrap box-border pt-4 border-y-4">
          {numberOt9Array.map((item: number, index: number) => {
            return (
              <li
                onClick={(e) => {
                  setOpen(true);
                  setNumber(item);
                }}
                key={index}
                className="w-1/5 flex justify-center "
              >
                <ol className="inline-block w-4/5 text-center text-sm py-2 text-white rounded bg-green-600 hover:bg-green-800  mb-4 shadow-md hover:mb-2 hover:cursor-pointer">
                  {item}
                </ol>
              </li>
            );
          })}
        </ul>
      <Table/>
   </Auth>
  )
}

export default Home