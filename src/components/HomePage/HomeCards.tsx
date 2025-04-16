import { Card } from 'flowbite-react'
import React from 'react'
import { ICourtCard } from '@/utils/Interfaces'
import fake from '@/utils/fake.json'


const HomeCards = () => {
    const data: ICourtCard[] = fake

  return (
    <div className='grid grid-cols-3 gap-[100px] mt-[50px]'>
        {data.map((items:ICourtCard, index:number) => {
            return(
                <Card key={index} className='max-w-sm flex justify-center'>
                    <div>
                    <h1 className='text-2xl text-bold'>{items.courtName}</h1>
                    <h2>Conditions:</h2>
                    <ul>
                        {items.courtCondition.map((condition) => {
                        return<li key={condition.id}>{condition.condition}</li>
                        })}
                    </ul>
                    <button className='bg-green-500 rounded-2xl w-[300px]'>Get Directions</button>

                </div>
                </Card>

            );
        })}
    </div>


  )
}

export default HomeCards
